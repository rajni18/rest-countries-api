import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import SelectMenu from "./SelectMenu";
import CountriesList from "./CountriesList";
import { useState } from "react";
import { useOutletContext } from "react-router";
import { useTheme } from "../hooks/useTheme";

function Home() {
  const [query, setQuery] = useState("");
  const [isDark, setIsDark] = useTheme();

  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu setQuery={setQuery} />
      </div>
      <CountriesList query={query} />
    </main>
  );
}

export default Home;
