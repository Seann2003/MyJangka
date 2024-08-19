"use client"
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { prepareContractCall } from "thirdweb"
import { useSendTransaction } from "thirdweb/react";
import { getCustomContract } from "./config";

const address = useActiveAccount()?.address;
    
// Reputation Contract
const reputationContract = getCustomContract("0xf3fbf6f7EB73517fed2078B873933AF32D5db612")

export const getAccountReputation = () => {
    // Get User Reputation Score
    const { data, isLoading } = useReadContract({ 
        contract: reputationContract, 
        method: "function getReputation(address user) view returns (uint256)", 
        params: address ? [address] : ['']
    });
    return { data, isLoading };
}

export const getAccountTotalBets = () => {
    // Get User Total Bets
    const { data, isLoading } = useReadContract({ 
        contract: reputationContract, 
        method: "function getTotalBets(address user) view returns (uint256)", 
        params: address ? [address] : ['']
    });
    return { data, isLoading };
}

export const getAccountTotalWinnings = () => {
    // Get User Total Winnings
    const { data, isLoading } = useReadContract({ 
        contract: reputationContract, 
        method: "function getTotalWinnings(address user) view returns (uint256)",  
        params: address ? [address] : ['']
    });
    return { data, isLoading };
}

export const getAccountTotalWins = () => {
    // Get User Total Wins
    const { data, isLoading } = useReadContract({ 
        contract: reputationContract, 
        method: "function getTotalWins(address user) view returns (uint256)", 
        params: address ? [address] : ['']
    });
    return { data, isLoading };
}

// Update user reputation score after event ends
export const updateAccountReputation = (correctPrediction: boolean) => {
    const { mutate: sendTransaction } = useSendTransaction();
    const transaction = prepareContractCall({ 
        contract: reputationContract, 
        method: "function updateReputation(address user, bool correctPrediction)", 
        params: [(address ? address: ''), correctPrediction] 
    });
    sendTransaction(transaction);
}