import { ContractOptions, createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "@/app/client";

// Set Scroll Sepolia as default
const chain = process.env.CHAIN ? process.env.CHAIN as unknown as number : 534351
// connect to your contract
export const getCustomContract = (address: string): Readonly<ContractOptions<[]>> => {
  return getContract({
    client,
    chain: defineChain(chain),
    address
  })
}