"use client";

import Marketplace from "@/components/marketplace";
import SearchBar from "@/components/searchBar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useState } from "react";

const tabs = ["Viral", "Latest", "News", "Transport", "Sports", "Tourism"];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Viral");
  const bannerData = [
    {
      image: "/banner-1.png",
      name: "Banner 1",
      description: "This is banner 1",
    },
    {
      image: "/banner-2.png",
      name: "Banner 2",
      description: "This is banner 2",
    },
    {
      image: "/banner-3.png",
      name: "Banner 3",
      description: "This is banner 3",
    },
  ];

  return (
    <main className="h-screen w-[99%] flex flex-col items-center ">
      <div className="items-center flex flex-col ">
        <div className="flex flex-col gap-4 justify-center text-center w-[70%] mb-4">
          <div className="pt-9 relative">
            <div className="flex justify-center">
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                }}
                className="w-[700px]"
              >
                <CarouselContent>
                  {bannerData.map((data, index) => (
                    <CarouselItem key={index}>
                      <div className="bg-white h-auto w-full bg-fill flex justify-center items-center rounded-2xl">
                        <Image
                          src={data.image}
                          alt={data.name}
                          width={1080}
                          height={400}
                          className="object-contain rounded-2xl"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious variant={"link"} className="md:left-2" />
                <CarouselNext variant={"link"} className="md:right-2" />
              </Carousel>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="flex border-b flex-row justify-between">
            <div>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 ${
                    activeTab === tab
                      ? "transition-all border-b-2 border-blue-500 font-bold text-white"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <SearchBar />
          <div className="p-4">
            <Marketplace />
          </div>
        </div>
      </div>
    </main>
  );
}
