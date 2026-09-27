import { BiSearch } from "react-icons/bi";
import { useState } from "react";

export const Search = ({
  onSearch,
  placeholder = "Search properties, areas, blogs or news",
}) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch?.(search.trim());
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center overflow-hidden rounded-xl
                   border border-gray-200 bg-white shadow-sm
                   transition-all duration-200
                   focus-within:border-blue-400
                   focus-within:ring-4 focus-within:ring-blue-50"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="min-w-0 flex-1 bg-transparent px-4 py-3
                     text-sm text-gray-900 outline-none
                     placeholder:text-gray-400 md:text-base"
        />

        <button
          type="submit"
          aria-label="Search"
          className="mr-1.5 flex h-10 w-10 shrink-0 items-center
                     justify-center rounded-lg bg-blue-600 text-white
                     transition-all duration-200
                     hover:bg-blue-700
                     active:scale-95"
        >
          <BiSearch className="text-xl" />
        </button>
      </form>
    </div>
  );
};