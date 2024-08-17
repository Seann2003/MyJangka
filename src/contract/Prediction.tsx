"use client"
import { useReadContract, useSendTransaction } from "thirdweb/react";
import { getCustomContract } from "./config";
import { prepareContractCall } from "thirdweb";
    
// Prediction Contract
const predictionContract = getCustomContract("0xF9fFEB5C783315e05bd7D6cE4d67dD793e1138aE")

export const getEvent = (eventId: bigint) => {
    const { data, isLoading } = useReadContract({ 
        contract: predictionContract, 
        method: "function events(uint256) view returns (string title, bool isOpen, bool outcomeSet, bool outcome, uint256 totalAmount, uint256 totalPositiveBet, uint256 totalNegativeBet, uint256 reputationRequirement)", 
        params: [eventId] 
      });
    return { data, isLoading };
}

// Predict on an event
export const predict = (eventId: bigint, predictedOutcome: boolean) => {
    const { mutate: sendTransaction } = useSendTransaction();
    const transaction = prepareContractCall({ 
        contract: predictionContract, 
        method: "function bet(uint256 eventId, bool predictedOutcome) payable", 
        params: [eventId, predictedOutcome] 
      });
    sendTransaction(transaction);
}

// Closing an event
export const closeEvent = (eventId: bigint, outcome: boolean) => {
    const { mutate: sendTransaction } = useSendTransaction();
    const transaction = prepareContractCall({ 
        contract: predictionContract, 
        method: "function closeEvent(uint256 eventId, bool outcome)", 
        params: [eventId, outcome]
    });
    sendTransaction(transaction);
}

// Creating an event
export const createEvent = (title: string) => {
    const { mutate: sendTransaction } = useSendTransaction();
    const transaction = prepareContractCall({ 
        contract: predictionContract, 
        method: "function createEvent(string title)", 
        params: [title]
    });
    sendTransaction(transaction);
}

// Distribute event winnings
export const distributeEventWinnings = (eventId: bigint) => {
    const { mutate: sendTransaction } = useSendTransaction();
    const transaction = prepareContractCall({ 
        contract: predictionContract, 
        method: "function distributeWinnings(uint256 eventId)", 
        params: [eventId]
    });
    sendTransaction(transaction);
}