"use client"
import { useContractEvents, useReadContract, useSendTransaction } from "thirdweb/react";
import { getCustomContract } from "./config";
import { prepareContractCall, prepareEvent } from "thirdweb";
    
// Prediction Contract
const predictionContract = getCustomContract("0x2370683e272947D28f81D0A2dB2e9dc7a6B7e0f0")

// Emitted event
const preparedEvent = prepareEvent({ 
    signature: "event UserParticipated(address indexed user, uint256 indexed eventId)" 
});
  
export const userParticipated = () => {
    const { data: event } = useContractEvents({ 
        contract: predictionContract, 
        events: [preparedEvent] 
    });
    return { event }
}


export const getEvent = (eventId: bigint) => {
    const { data, isLoading } = useReadContract({ 
        contract: predictionContract, 
        method: "function events(uint256) view returns (string title, bool isOpen, bool outcomeSet, bool outcome, uint256 totalAmount, uint256 totalPositiveBet, uint256 totalNegativeBet, uint256 reputationRequirement)", 
        params: [eventId] 
      });
    return { data, isLoading };
}

export const getEventCount = () => {
    const { data, isLoading } = useReadContract({ 
        contract: predictionContract, 
        method: "function getEventCount() view returns (uint256 eventCount)", 
        params: [] 
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