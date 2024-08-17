import { CiSearch } from "react-icons/ci";

export default function SearchBar() {
  return (
    <>
      <div className="flex flex-row justify-center items-center gap-2 pr-2">
        <input
          placeholder="Search"
          type="search"
          className=" flex p-2 bg-transparent border-gray-500 border rounded-lg h-8 text-white"
        />
        <CiSearch className="text-xl cursor-pointer" />
      </div>
    </>
  );
}
