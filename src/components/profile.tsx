import Image from "next/image";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState, useEffect } from "react";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".dropdown")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className="relative flex flex-row justify-center items-center gap-2 h-auto py-2 px-4 rounded-full hover:bg-white hover:bg-opacity-10"
        onClick={toggleDropdown}
      >
        <Avatar>
          <AvatarImage src="/profile-pic.png" />
        </Avatar>
        <div className="text-white text-2xl">
          <MdKeyboardArrowDown />
        </div>
        {isOpen && (
          <div className="absolute bg-white text-black rounded shadow-lg mt-2 dropdown right-0 top-full">
            <div className="py-2 px-4 cursor-pointer">Username</div>
            <div className="py-2 px-4 cursor-pointer hover:bg-slate-100">
              Settings
            </div>
            <div className="py-2 px-4 cursor-pointer hover:bg-slate-100">
              Log Out
            </div>
          </div>
        )}
      </div>
    </>
  );
}
