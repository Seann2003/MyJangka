import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  MarketplaceGrid,
  MarketplaceGridItem,
} from "@/components/marketplaceCard";
import { getEvent, getEventCount } from "@/contract/Prediction";

interface Event {
  title: string;
  totalParticipants: number;
  totalAmount: string;
  yes: number;
  no: number;
  icon: string;
}

export default function MarketPlace() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data: eventCount } = getEventCount(); // Get the total number of events
      if (eventCount) {
        const eventsList = [];
        for (let i = 0n; i < eventCount; i++) {
          const { data: eventData } = getEvent(i); // Fetch each event by its ID
          if (eventData) {
            eventsList.push({
              title: eventData.title,
              totalParticipants: Number(eventData.totalParticipants),
              totalAmount: (Number(eventData.totalAmount) / 1e18).toFixed(2), // Convert wei to Ether
              yes: Number(eventData.totalPositiveBet),
              no: Number(eventData.totalNegativeBet),
              icon: "/Coat_of_arms_of_Malaysia.svg.png",
            });
          }
        }
        setEvents(eventsList);
      }
    };

    fetchEvents();
  }, []);

  return (
    <MarketplaceGrid className="max-w-4xl mx-auto h-auto">
      {events.map((event, i) => (
        <MarketplaceGridItem
          key={i}
          title={event.title}
          totalParticipants={event.totalParticipants}
          totalAmount={event.totalAmount}
          yes={event.yes}
          no={event.no}
          icon={event.icon}
          className="my-10"
        />
      ))}
    </MarketplaceGrid>
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
