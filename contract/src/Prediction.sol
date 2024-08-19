// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Interface to access "Reputation" contract
interface IReputationSystem {
    function getReputation(address user) external view returns (uint256);
}

contract Prediction {
    // User Bet Structure
    struct Bet {
        bool predictedOutcome;
        bool claimed;           // Whether the user has claimed their winnings
        uint256 amount;
    }
    // Event Structure
    struct Event {
        string title;
        bool isOpen;            // Whether the event is open for betting
        bool outcomeSet;        // Whether the outcome of the event has been set
        bool outcome;
        uint256 totalParticipants;
        uint256 totalAmount;
        uint256 totalPositiveBet;
        uint256 totalNegativeBet;
        uint256 reputationRequirement; // Reputation requirement to join the prediction
        mapping(address => Bet) bets;  // Mapping to store bets by users
    }

    Event[] public events;
    uint256 private eventLength;
    address private reputationAddress;

    // Event to log user participation
    event UserParticipated(address indexed user, uint indexed eventId);

    constructor(address _reputationAddress) {
        reputationAddress = _reputationAddress;
    }

    function getEventCount() public view  returns (uint eventCount){
        return eventLength;
    }

    function createEvent(string memory title) public {
        Event storage newEvent = events.push();
        newEvent.title = title;
        newEvent.isOpen = true;
        newEvent.outcomeSet = false;
        newEvent.totalAmount = 0;
        newEvent.totalParticipants = 0;
        newEvent.totalNegativeBet = 0;
        newEvent.totalPositiveBet = 0;
        newEvent.reputationRequirement = 0;
    }

    function bet(uint eventId, bool predictedOutcome) public payable {
        require(
            eventId < events.length, 
            "Invalid event ID"
        );

        Event storage eventToBet = events[eventId];

        require(
            eventToBet.isOpen,
            "Betting for this event is closed"
        );
        require(
            msg.value > 0, 
            "Invalid betting amount, please try again"
        );
        // Check if user has enough reputation points
        IReputationSystem verifier = IReputationSystem(reputationAddress);
        require(
            verifier.getReputation(msg.sender) >= eventToBet.reputationRequirement,
            "Insufficient reputation points, please try other events"
        );
        // Add on existing bets, if any
        if (eventToBet.bets[msg.sender].amount != 0) {
            Bet storage userBet = eventToBet.bets[msg.sender];
            // Ensure user bet on only one outcome
            require(userBet.predictedOutcome == predictedOutcome, "You can't bet on both outcomes!");
            userBet.amount += msg.value;
            eventToBet.bets[msg.sender] = userBet;
        } else {
            // Record new user's bet
            eventToBet.bets[msg.sender] = Bet({
                predictedOutcome: predictedOutcome,
                amount: msg.value,
                claimed: false
            });
            // Emit event to log the user's participation
            emit UserParticipated(msg.sender, eventId);
        }
        uint256 betAmount = msg.value * 95 / 100;
        if (predictedOutcome) {
            eventToBet.totalPositiveBet += betAmount;
        } else {
            eventToBet.totalNegativeBet += betAmount;
        }
        // Add on 95% of value to total price pool
        eventToBet.totalAmount += betAmount;
        // Transfer the money to account (5% commission)
        payable(address(this)).transfer(msg.value - betAmount);
    }

    function closeEvent(uint eventId, bool outcome) public {
        require(
            eventId < events.length,
            "Invalid event ID"
        );
        Event storage eventToClose = events[eventId];
        require(
            eventToClose.isOpen,
            "Event is already closed"
        );
        eventToClose.isOpen = false;
        eventToClose.outcomeSet = true;
        eventToClose.outcome = outcome;
    }

    function distributeWinnings(uint eventId) public {
        require(
            eventId < events.length,
            "Invalid event ID"
        );
        Event storage eventToClaim = events[eventId];
        require(
            !eventToClaim.isOpen,
            "Event is still open"
        );
        require(
            eventToClaim.outcomeSet,
            "Event outcome has not been set"
        );

        Bet storage userBet = eventToClaim.bets[msg.sender];
        require(
            !userBet.claimed,
            "Winnings already claimed"
        );
        require(
            userBet.amount > 0,
            "You did not bet on this event"
        );
        // Ensure the user's prediction was correct
        require(
            userBet.predictedOutcome == eventToClaim.outcome,
            "Incorrect prediction"
        );

        // Calculate the winner's share of the total pool based on their bet
        uint256 winnings = (eventToClaim.totalAmount * userBet.amount) / (eventToClaim.outcome ? eventToClaim.totalPositiveBet : eventToClaim.totalNegativeBet);

        // Mark winnings as claimed
        userBet.claimed = true;

        // Transfer the winnings to the user
        payable(msg.sender).transfer(winnings);
    }
}