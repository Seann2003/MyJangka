import { Chain, ContractOptions, createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "@/app/client";


const chain: Chain = {
  id: process.env.CHAIN ? process.env.CHAIN as unknown as number : 534351, // or your chain ID
  rpc: process.env.RPC_URL ? process.env.RPC_URL as unknown as string : "https://sepolia-rpc.scroll.io/", // or your RPC URLs
  // other chain properties
};

// connect to your contract
export const getCustomContract = (address: string): Readonly<ContractOptions<[]>> => {
  return getContract({
    client,
    chain: defineChain(chain),
    address
  })
}