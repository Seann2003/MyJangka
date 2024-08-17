"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <>
      <nav className="sticky top-0 z-50 bg-transparent backdrop-filter backdrop-blur-lg bg-opacity-5 w-screen py-1">
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

            <div className="flex space-x-4 text-white">
              <a href="#">About</a>
              <a href="#market">Marketplace</a>
              <a href="#footer">Contact Us</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
