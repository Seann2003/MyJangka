"use client";

import { HiMenu } from "react-icons/hi";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(function handleWindowScroll() {
    const handleScroll = () => {
      const twentyPercentOfPageHeight = window.innerHeight * 0.3;

      // Check if the user has scrolled 30% of the total document height
      if (window.scrollY > twentyPercentOfPageHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={cn(
          "md:py-[32px] px-[30px] text-white sticky top-0 z-20 bg-[#131313] md:justify-center items-center hidden md:flex",
          isScrolled
            ? "md:justify-between shadow-[#A5BE6D] shadow-[0px_-8px_30px_0px]"
            : ""
        )}
      >
        <motion.div layout>
        </motion.div>
        <motion.div
          layout
          className={cn(
            "flex space-x-8 md:text-[18px] lg:text-[20px] justify-end"
          )}
        >
          {/* Use Link for navigation */}
          <Link
            href="#about-us"
            className="hover:font-bold hover:text-shadow-default"
          >
            About us
          </Link>
          <Link
            href="#footer"
            className="hover:font-bold hover:text-shadow-default"
          >
            Contact us
          </Link>
        </motion.div>
      </nav>
    </>
  );
}