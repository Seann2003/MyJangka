"use client"
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { prepareContractCall } from "thirdweb"
import { useSendTransaction } from "thirdweb/react";
import { getCustomContract } from "./config";

const address = useActiveAccount()?.address;
    
// Reputation Contract
const reputationContract = getCustomContract("0xF9fFEB5C783315e05bd7D6cE4d67dD793e1138aE")

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