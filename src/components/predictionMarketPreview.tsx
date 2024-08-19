import { cn } from "@/lib/utils";
import React from "react";
import { CardGrid, CardItem } from "@/components/predictCard";

export default function PredictionMarketPreview() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="text-4xl font-bold mb-10">Prediction Market</div>
      <CardGrid className="max-w-4xl mx-auto">
        {items.map((item, i) => (
          <CardItem
            key={i}
            title={item.title}
            totalParticipants={item.totalParticipants}
            totalAmount={item.totalAmount}
            yes={item.yes}
            no={item.no}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </CardGrid>
    </div>
  );
}

const items = [
  {
    title: "The inflation rate in Malaysia for Q3 2024 will be above 4.5%",
    totalParticipants: 75,
    totalAmount: "$75",
    yes: 45,
    no: 30,
    icon: "/Coat_of_arms_of_Malaysia.svg.png",
  },
  {
    title:
      "The number of registered electric vehicles in Malaysia by December 2024 will surpass 100,000",
    totalParticipants: 120,
    totalAmount: "$120",
    yes: 70,
    no: 50,
    icon: "/Coat_of_arms_of_Malaysia.svg.png",
  },
  {
    title: "Malaysia's GDP growth for 2024 will exceed 5%",
    totalParticipants: 95,
    totalAmount: "$95",
    yes: 60,
    no: 35,
    icon: "/Coat_of_arms_of_Malaysia.svg.png",
  },
  {
    title:
      "The unemployment rate in Malaysia will drop below 3% by November 2024",
    totalParticipants: 80,
    totalAmount: "$80",
    yes: 50,
    no: 30,
    icon: "/Coat_of_arms_of_Malaysia.svg.png",
  },
  {
    title:
      "Malaysia will record more than 2 million international tourist arrivals in Q4 2024",
    totalParticipants: 65,
    totalAmount: "$65",
    yes: 40,
    no: 25,
    icon: "/Coat_of_arms_of_Malaysia.svg.png",
  },
];
