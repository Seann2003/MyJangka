import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { MdPerson } from "react-icons/md";
import { Progress } from "@/components/ui/progress";

export const CardGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
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
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent hover:scale-105 hover:brightness-110 justify-between flex flex-col",
        className
      )}
    >
      <div className="transition duration-200">
        {icon && <Image src={icon} alt="icon" width={50} height={50} />}
        <div className="font-sans text-base font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
      </div>
      <Progress value={((yes ?? 0) / (totalParticipants ?? 1)) * 100} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3">
          <button className="px-3 py-1 w-full rounded-md hover:bg-green-500 hover:text-white font-light transition duration-200 bg-secondary text-green-500 border-2">
            Predict Yes
          </button>

          <button className="px-3 py-1 w-full rounded-md hover:bg-red-500 hover:text-white font-light transition duration-200 bg-secondary text-red-500 border-2 ">
            Predict No
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
    </div>
  );
};
