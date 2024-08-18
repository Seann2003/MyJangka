import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";

export default function WhatisMyJangka() {
  const words =
    "MyJangka is a Web3 prediction market platform designed for Malaysians. It empowers communities to make informed decisions by leveraging collective intelligence in a secure and transparent environment. By utilizing blockchain technology, MyJangka ensures fair participation, accurate predictions, and increases social awareness on important topics, contributing to societal growth through data-driven insights.";
  return (
    <>
      <div>
        <HeroHighlight>
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
          >
            What is{" "}
            <Highlight className="text-black dark:text-white">
              MyJangka
            </Highlight>
          </motion.h1>
          <div className="max-w-4xl py-4">
            <TextGenerateEffect words={words} />
          </div>
        </HeroHighlight>
      </div>
    </>
  );
}
