import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GetStartedButton } from "@/components/getStartedButton";
import PredictionMarketPreview from "@/components/predictionMarketPreview";

export default function Home() {
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="pb-20 pt-10 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex justify-center mb-4">
            <Image
              src={"/MyJangka.svg"}
              width={500}
              height={500}
              alt=""
              className="justify-center"
              style={{
                filter: "drop-shadow(0px 0px 40px #a726a9a8)",
              }}
            />
          </div>
          <div className=" mx-auto m-8 mb-12">
            <p className="relative z-10 text-lg md:text-4xl bg-clip-text text-transparent bg-white text-center font-sans font-bold">
              Predict, Profit, and Prosper in Malaysian style.
            </p>
          </div>

          <div className="flex justify-center mb-20 z-10">
            <GetStartedButton />
          </div>
        </div>
        <PredictionMarketPreview />
      </div>
      <BackgroundBeams />
    </main>
  );
}
