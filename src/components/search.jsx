import React from "react";
const Search = ({ search, setSearchResult }) => {
  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="search" />
        <input
          onChange={(e) => setSearchResult(e.target.value)}
          type="text"
          placeholder="Search for your favorite movies"
          value={search}
        />
      </div>
    </div>
  );
};

export default Search;
