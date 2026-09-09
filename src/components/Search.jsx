import { BiSearch } from "react-icons/bi";
import { useState } from "react";

export const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    onSearch(query);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full bg-white border border-gray-300
                   rounded-md overflow-hidden shadow-sm"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search plots or commercial sites in Hyderabad"
          className="flex-1 min-w-0 px-4 py-2 outline-none text-sm
                     md:text-base text-gray-900"
        />

        <button
          type="submit"
          className="shrink-0 px-4 py-2 bg-black text-white
                     hover:bg-gray-800 transition cursor-pointer rounded-2xl"
        >
          <BiSearch className="text-xl" />
        </button>
      </form>
    </div>
  );
};