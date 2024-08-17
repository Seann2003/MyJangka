// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.19;

contract Reputation {
    // User Structure
    struct User {
        uint256 reputationPoints;
        uint256 totalBets;
    }

    mapping(address => User) private users;

    event ReputationUpdated(address indexed user, uint256 newReputation);

    // Update reputation points after a user makes a prediction
    function updateReputation(address user, bool correctPrediction) public {
        // Cap at 100
        if (users[user].reputationPoints != 100) {
            if (correctPrediction) {
                users[user].reputationPoints += 10; // Award 10 points for a correct prediction
            } else {
                users[user].reputationPoints += 2; // Deduct 5 points for an incorrect prediction
            }
        }
        users[user].totalBets += 1;
        emit ReputationUpdated(user, users[user].reputationPoints);
    }

    // Get user total bets
    function getTotalBets(address user) public view returns (uint256) {
        return users[user].totalBets;
    }

    // Get user reputation
    function getReputation(address user) public view returns (uint256) {
        return users[user].reputationPoints;
    }
}