"use client";
import React from 'react';
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { getCustomContract } from '@/contract/config';

const TestPage: React.FC = () => {
    // Use connected account wallet address
    const address = useActiveAccount()?.address;
    
    // Reputation Contract
    const reputationContract = getCustomContract("0xF9fFEB5C783315e05bd7D6cE4d67dD793e1138aE")
    // Get User Reputation Score
    const { data, isLoading } = useReadContract({ 
        contract: reputationContract, 
        method: "function getReputation(address user) view returns (uint256)", 
        params: address ? [address] : ['']
    });
    // 
    
    return (
        <section className="flex items-center justify-center min-h-[80vh]">
            {!address ? (
                isLoading ? (
                    <p>Loading reputation...</p>
                ) : (
                    <p>Your reputation score: {data?.toString()}</p>
                )
            ) : (
                <p>Please connect your wallet to see your reputation score.</p>
            )}
        </section>
    );
}
export default TestPage