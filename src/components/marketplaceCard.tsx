import React from "react";
import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { MdPerson } from "react-icons/md";
import { Progress } from "@/components/ui/progress";

export const MarketplaceGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("grid grid-cols-2 gap-4 max-w-7xl mx-auto ", className)}>
      {children}
    </div>
  );
};

export const MarketplaceGridItem = ({
  className,
  title,
  totalParticipants,
  totalAmount,
  yes,
  no,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  totalParticipants?: number;
  totalAmount?: string;
  yes?: number;
  no?: number;
  icon?: string | StaticImport;
}) => {
  return (
    <div
      className={cn(
        "mb-4 rounded-xl hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between w-full gap-4 flex flex-col hover: hover:brightness-110"
      )}
    >
      <div className=" transition duration-200">
        {icon && <Image src={icon} alt="icon" width={60} height={60} />}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
      </div>
      <Progress value={((yes ?? 0) / (totalParticipants ?? 1)) * 100} />
      <div className="flex flex-row gap-4">
        <button className="px-3 py-1 w-full rounded-md hover:bg-green-500 hover:text-white font-light transition duration-200 bg-secondary text-green-500 border-2">
          Bet Yes
        </button>

        <button className="px-3 py-1 w-full rounded-md hover:bg-red-500 hover:text-white font-light transition duration-200 bg-secondary text-red-500 border-2">
          Bet No
        </button>
      </div>
      <div className="flex flex-row items-center justify-between mt-auto text-sm">
        <div className="font-sans font-medium text-neutral-600 dark:text-neutral-300 flex items-center">
          <MdPerson className="h-5 w-5 mr-1" />
          <span>{totalParticipants}</span>
        </div>
        <div> {totalAmount} Bet</div>
      </div>
    </div>
  );
};
