"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { SiMarketo } from "react-icons/si";
import { MdLeaderboard } from "react-icons/md";
import Profile from "./profile";

export default function Navbar2() {
  const router = useRouter();
  const pathname = usePathname();
  const isMarketPage = pathname === "/market"; // Check if current page is market
  const isRankPage = pathname === "/rank"; // Check if current page is rank
  return (
    <>
      <nav className="sticky top-0 z-10 bg-transparent backdrop-filter backdrop-blur-lg bg-opacity-5 w-screen py-1">
        <div className="max-w-5xl mx-auto px-4">
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
            <div className="flex flex-row w-auto gap-14">
              <div
                className={`flex flex-col justify-center items-center ${
                  isMarketPage ? "text-white" : "text-sky-700"
                } hover:scale-105 hover:brightness-125 cursor-pointer`}
                onClick={() => {
                  router.push("/market");
                }}
              >
                <SiMarketo className="w-7 h-7" />
                <p>Market</p>
              </div>
              <div
                className={`flex flex-col justify-center items-center ${
                  isRankPage ? "text-white" : "text-sky-700"
                } hover:scale-105 hover:brightness-125 cursor-pointer`}
                onClick={() => {
                  router.push("/rank");
                }}
              >
                <MdLeaderboard className="w-7 h-7" />
                <p>Rank</p>
              </div>
            </div>

            <Profile />
          </div>
        </div>
      </nav>
    </>
  );
}
