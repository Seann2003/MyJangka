import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { MdPerson } from "react-icons/md";
import { Progress } from "@/components/ui/progress";
import { getCustomContract } from "@/contract/config";
import { usePredict } from "@/contract/usePredict";
import { useRouter } from 'next/navigation';


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
  const [showYesOverlay, setShowYesOverlay] = useState(false);
  const [showNoOverlay, setShowNoOverlay] = useState(false);
  const [betAmount, setBetAmount] = useState("");

  const handleYesClick = () => {
    setShowYesOverlay(true);
  };

  const handleNoClick = () => {
    setShowNoOverlay(true);
  };

  const closeOverlay = () => {
    setShowYesOverlay(false);
    setShowNoOverlay(false);
  };

  const predictionContract = getCustomContract("0x2370683e272947D28f81D0A2dB2e9dc7a6B7e0f0");
  const { predict } = usePredict(predictionContract); // Use custom hook

  const handleSubmit = (predictedOutcome: boolean) => {
    // Convert betAmount to bigint
    alert(`You have bought ${betAmount} shares!`)
    const amountInBigInt = BigInt(Number(betAmount) * 1e18); // Convert to wei
    predict(0n, predictedOutcome, amountInBigInt)
    closeOverlay();
  };

  const { push } = useRouter();

  return (
    <div
      className={cn(
        "mb-4 rounded-xl hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between w-full flex flex-col hover: hover:brightness-110"
      )}
    >
      <div className=" transition duration-200" onClick={()=>{push('/japangdp');}}>
        {icon && <Image src={icon} alt="icon" width={60} height={60} />}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2"
        >
          {title}
        </div>
      </div>
      <div className="gap-4 flex flex-col">
        <Progress value={((yes ?? 0) / (totalParticipants ?? 1)) * 100} />
        <div className="flex flex-row gap-4">
          <button
            onClick={handleYesClick}
            className="px-3 py-1 w-full rounded-md hover:bg-green-500 hover:text-white font-light transition duration-200 bg-secondary text-green-500 border-2"
          >
            Predict Higher
          </button>

          <button
            onClick={handleNoClick}
            className="px-3 py-1 w-full rounded-md hover:bg-red-500 hover:text-white font-light transition duration-200 bg-secondary text-red-500 border-2"
          >
            Predict Lower
          </button>
        </div>
        {/* Overlay for Yes */}
        {showYesOverlay && (
          <div className="overlay">
            <div className="overlay-content flex flex-col gap-2">
              <h2>Enter Predict Amount for Higher</h2>
              <div className="flex flex-row gap-2">
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                />
                <div className="flex flex-row gap-5">
                  <button
                    onClick={() => handleSubmit(true)}
                    className="bg-blue-500 py-1 px-2 rounded-lg"
                  >
                    Submit
                  </button>
                  <button
                    onClick={closeOverlay}
                    className="border-gray-400 py-1 px-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Overlay for No */}
        {showNoOverlay && (
          <div className="overlay">
            <div className="overlay-content flex flex-col gap-2">
              <h2>Enter Bet Amount for Lower</h2>
              <div className="flex flex-row gap-2">
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                />
                <div className="flex flex-row gap-4">
                  <button
                    onClick={() => handleSubmit(false)}
                    className="bg-blue-500 py-1 px-2 rounded-lg"
                  >
                    Submit
                  </button>
                  <button
                    onClick={closeOverlay}
                    className="border-gray-400 py-1 px-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row items-center justify-between mt-auto text-sm">
          <div className="font-sans font-medium text-neutral-600 dark:text-neutral-300 flex items-center">
            <MdPerson className="h-5 w-5 mr-1" />
            <span>{totalParticipants}</span>
          </div>
          <div> {totalAmount} Pool</div>
        </div>
      </div>
    </div>
  );
};
