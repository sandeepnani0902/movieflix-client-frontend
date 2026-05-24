import { useState } from "react";

const SearchBar = ({ onSearch, placeholder = "Search...", className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form className={`w-full max-w-[500px] mx-auto mb-6 ${className}`} onSubmit={handleSubmit}>
      <div className="relative flex items-center bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 focus-within:shadow-[0_4px_20px_rgba(239,68,68,0.3)] focus-within:-translate-y-0.5">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-grow px-4 py-3 border-none outline-none text-slate-900 text-sm md:text-base placeholder-slate-400 bg-transparent"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-14 bg-transparent border-none text-slate-400 text-xl cursor-pointer p-1 hover:text-red-500 transition-colors"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-3 bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white border-none rounded-r-xl cursor-pointer"
          aria-label="Search"
        >
          🔍
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
