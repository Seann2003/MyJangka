import { useSendTransaction } from "thirdweb/react";
import { ContractOptions, prepareContractCall } from "thirdweb";

export const usePredict = (contractAddress: Readonly<ContractOptions<[]>>) => {
  const { mutate: sendTransaction } = useSendTransaction();
  
  const predict = async (eventId: bigint, predictedOutcome: boolean, amount: bigint) => {
    const transaction = prepareContractCall({
      contract: contractAddress, // Use the contract address
      method: "function bet(uint256 eventId, bool predictedOutcome) payable",
      params: [eventId, predictedOutcome],
      value: amount
    });
    console.log(transaction);
    sendTransaction(transaction);
  };

  return { predict };
};