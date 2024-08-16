// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Prediction {
    // User Bet Structure
    struct Bet {
        bool predictedOutcome;
        bool claimed;           // Whether the user has claimed their winnings
        uint256 amount;
    }
    // Event Structure
    struct Event {
        string description;
        bool isOpen;            // Whether the event is open for betting
        bool outcomeSet;        // Whether the outcome of the event has been set
        bool outcome;
        uint256 totalAmount;
        mapping(address => Bet) bets;  // Mapping to store bets by users
    }

    Event[] public events;

    function createEvent(string memory description) public {
        Event storage newEvent = events.push();
        newEvent.description = description;
        newEvent.isOpen = true;
        newEvent.outcomeSet = false;
        newEvent.totalAmount = 0;
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
        }
        // Add on the value to total price pool
        eventToBet.totalAmount += msg.value;
        // Transfer the money to account
        payable(address(this)).transfer(msg.value);
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
        require(!userBet.claimed, "Winnings already claimed");
        require(userBet.amount > 0, "You did not bet on this event");

        // Ensure the user's prediction was correct
        if (userBet.predictedOutcome == eventToClaim.outcome) {
            // Calculate the total amount to be distributed (85% of the total pool) - To be change
            uint256 totalAmountToDistribute = (eventToClaim.totalAmount * 85) / 100;

            // Calculate the winner's share of the total pool
            uint256 winnings = (totalAmountToDistribute * userBet.amount) / eventToClaim.totalAmount;

            // Mark winnings as claimed
            userBet.claimed = true;

            // Transfer the winnings to the user
            payable(msg.sender).transfer(winnings);
        }
    }

    // Handle 10% and 5% transfers to own account and beneficiary
    function distributeFees(uint eventId, address payable ownerAccount, address payable beneficiaryAccount) public {
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

        // Calculate the 10% and 5% amounts
        uint256 ownerFee = (eventToClaim.totalAmount * 10) / 100;
        uint256 beneficiaryFee = (eventToClaim.totalAmount * 5) / 100;

        // Transfer to owner and charity
        ownerAccount.transfer(ownerFee);
        beneficiaryAccount.transfer(beneficiaryFee);
    }
}