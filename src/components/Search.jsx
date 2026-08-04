import { BiSearch } from "react-icons/bi";

export const Search = () => {
  return (
    <div className="w-full">
      <form className="flex items-center w-full bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm">
        <input
          type="text"
          placeholder="Search plots or commercial sites in Hyderabad"
          className="flex-1 px-4 py-2 outline-none text-sm md:text-bas hover:text-blue-500 transition-all"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition cursor-pointer rounded-2xl"
        >
          <BiSearch className="text-xl " />
        </button>
      </form>
    </div>
  );
};
