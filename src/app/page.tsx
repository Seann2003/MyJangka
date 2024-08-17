import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GetStartedButton } from "@/components/getStartedButton";
import PredictionMarketPreview from "@/components/predictionMarketPreview";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
        <div className="pb-20 flex flex-col items-center justify-center">
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
            <div className=" mx-auto m-8 mb-12 pb-4">
              <p className="relative z-10 text-2xl bg-clip-text text-transparent bg-white text-center font-sans font-light">
                Predict, Profit, and Prosper in Malaysian style.
              </p>
            </div>

            <div className="flex justify-center mb-20 z-10">
              <GetStartedButton />
            </div>
          </div>
          <div id="market">
            <PredictionMarketPreview />
          </div>
        </div>
        <BackgroundBeams />
      </main>
      <Footer />
    </div>
  );
}
