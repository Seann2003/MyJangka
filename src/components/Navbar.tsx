"use client";
import { client } from "@/app/client";
import Image from "next/image";
import * as Web3 from "@solana/web3.js";
import AppWalletProvider from "@/components/AppWalletProvider";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

const WalletMultiButtonDynamic = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
);


export default function Navbar() {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState(0);  
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        const address = publicKey.toBase58();
        setAddress(address);

        try {
          const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
          const balance = await connection.getBalance(publicKey);
          setBalance(balance / Web3.LAMPORTS_PER_SOL);
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance(0);
        }
      } else {
        setAddress("");
        setBalance(0);
      }
    };

    fetchBalance();
  }, [publicKey]);

  const router = useRouter();
  return (
    <>
      <nav className="sticky top-0 z-50 bg-transparent backdrop-filter backdrop-blur-lg bg-opacity-5 w-screen py-1">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Image
              src="/Myjangka.svg"
              width={150}
              height={150}
              alt="logo"
              className="hover:cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            />
            <WalletMultiButtonDynamic/>
            <div className="flex space-x-4 text-white justify-center items-center">
              <a href="#">About</a>
              <a href="#market">Marketplace</a>
              <a href="#footer">Contact Us</a>
              {/* <a
                href="/signup"
                className="border border-white rounded-lg px-3 py-1"
              >
                Sign Up
              </a>
              <a
                href="/login"
                className="border border-white bg-white text-black rounded-lg px-3 py-1"
              >
                Login
              </a> */}
              <p>{`Balance: ${balance} SOL`}</p>

            </div>
          </div>

        </div>
      </nav>
    </>
  );
}
