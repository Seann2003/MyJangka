import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GrMoney } from "react-icons/gr";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import Navbar2 from "@/components/Navbar2";

export default function Rank() {
  const users = [
    {
      username: "user1",
      pic_url: "/profile-pic.png",
      volume: 1000,
      profit: 150,
    },
    {
      username: "user2",
      pic_url: "/profile-pic2.png",
      volume: 2000,
      profit: 300,
    },
    {
      username: "user3",
      pic_url: "/profile-pic.png",
      volume: 1500,
      profit: 200,
    },
    {
      username: "user4",
      pic_url: "/profile-pic2.png",
      volume: 2500,
      profit: 400,
    },
    {
      username: "user5",
      pic_url: "/profile-pic.png",
      volume: 3000,
      profit: 500,
    },
    {
      username: "user6",
      pic_url: "/profile-pic2.png",
      volume: 1800,
      profit: 250,
    },
    {
      username: "user7",
      pic_url: "/profile-pic.png",
      volume: 2200,
      profit: 350,
    },
    {
      username: "user8",
      pic_url: "/profile-pic2.png",
      volume: 2700,
      profit: 450,
    },
  ];

  // Sort users by volume and profit
  const sortedByVolume = [...users].sort((a, b) => b.volume - a.volume);
  const sortedByProfit = [...users].sort((a, b) => b.profit - a.profit);

  return (
    <>
      <div className="h-screen w-[99%] flex flex-col items-center border">
        <Navbar2 />
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <div className="text-3xl font-bold">Leaderboard</div>
          <div className="flex flex-row gap-7 justify-center items-center w-full">
            <div className="flex flex-col bg-secondary w-1/3 justify-center items-center px-10 py-8 rounded-xl">
              <div className="text-xl font-bold flex flex-row justify-center items-center gap-4 mb-4">
                {" "}
                <GrMoney />
                <div>Volume</div>
              </div>
              <div className="flex flex-col w-full">
                {sortedByVolume.map((user, index) => (
                  <div
                    key={user.username}
                    className="flex flex-row justify-between w-full px-10 py-2 items-center"
                  >
                    <div className="flex flex-row justify-center items-center gap-4">
                      {index + 1}.{" "}
                      <Avatar>
                        <AvatarImage src={user.pic_url} />
                      </Avatar>{" "}
                      {user.username}
                    </div>
                    <div>{user.volume} ETH</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col bg-secondary w-1/3 justify-center items-center px-10 py-8 rounded-xl">
              <div className="text-xl font-bold flex flex-row justify-center items-center gap-4 mb-4">
                <FaMoneyBillTrendUp />
                <div>Profit</div>
              </div>
              <div className="flex flex-col w-full">
                {sortedByProfit.map((user, index) => (
                  <div
                    key={user.username}
                    className="flex flex-row justify-between w-full px-10 py-2 items-center"
                  >
                    <div className="flex flex-row justify-center items-center gap-4">
                      {index + 1}.{" "}
                      <Avatar>
                        <AvatarImage src={user.pic_url} />
                      </Avatar>{" "}
                      {user.username}
                    </div>
                    <div>{user.profit} ETH</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
