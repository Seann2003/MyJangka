import { cn } from "@/lib/utils";
import React from "react";
import {
  MarketplaceGrid,
  MarketplaceGridItem,
} from "@/components/marketplaceCard";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

function groupItemsByCountry(items: any[]) {
  return items.reduce((acc, item) => {
    const { country } = item;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(item);
    return acc;
  }, {});
}


export default function MarketPlace() {
  const groupedItems = groupItemsByCountry(items);

  return (
    <div className="max-w-6xl mx-auto">
      {Object.keys(groupedItems).map((country) => (
        <div key={country} className="my-8">
          <h2 className="text-2xl font-bold mb-4">{country}</h2>
          <MarketplaceGrid className="grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer">
            {groupedItems[country].map((item: { title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; totalParticipants: number | undefined; totalAmount: string | undefined; yes: number | undefined; no: number | undefined; icon: string | StaticImport | undefined; }, i: React.Key | null | undefined) => (
              <MarketplaceGridItem
                key={i}
                title={item.title}
                totalParticipants={item.totalParticipants}
                totalAmount={item.totalAmount}
                yes={item.yes}
                no={item.no}
                icon={item.icon}
                className="my-5"
              />
            ))}
          </MarketplaceGrid>
        </div>
      ))}
    </div>
  );
}

const items = [
  {
    country: "Malaysia",
    title: "The inflation rate in Malaysia for Q3 2024 will be above 4.5%",
    totalParticipants: 75,
    totalAmount: "$75",
    yes: 45,
    no: 30,
    icon: "/Coat_of_arms_of_Malaysia.svg.png",
  },
  {
    country: "Malaysia",
    title:
      "The number of registered electric vehicles in Malaysia by December 2024 will surpass 100,000",
    totalParticipants: 120,
    totalAmount: "$120",
    yes: 70,
    no: 50,
    icon: "/Coat_of_arms_of_Malaysia.svg.png",
  },
  {
    country: "Malaysia",
    title: "Malaysia's GDP growth for 2024 will exceed 5%",
    totalParticipants: 95,
    totalAmount: "$95",
    yes: 60,
    no: 35,
    icon: "/Coat_of_arms_of_Malaysia.svg.png",
  },
  {
    country: "Malaysia",
    title:
      "The unemployment rate in Malaysia will drop below 3% by November 2024",
    totalParticipants: 80,
    totalAmount: "$80",
    yes: 50,
    no: 30,
    icon: "/Coat_of_arms_of_Malaysia.svg.png",
  },
  {
    country: "Malaysia",
    title:
      "Malaysia will record more than 2 million international tourist arrivals in Q4 2024",
    totalParticipants: 65,
    totalAmount: "$65",
    yes: 40,
    no: 25,
    icon: "/Coat_of_arms_of_Malaysia.svg.png",
  },  {
    country: "US",
    title: "The US inflation rate for Q3 2024 will be above 3%",
    totalParticipants: 150,
    totalAmount: "$150",
    yes: 90,
    no: 60,
    icon: "/US_Flag.png",
  },
  {
    country: "Japan",
    title: "Japan's GDP growth for 2024 will exceed 2%",
    totalParticipants: 95,
    totalAmount: "$95",
    yes: 60,
    no: 35,
    icon: "/Japan_Flag.png",
  },
];
