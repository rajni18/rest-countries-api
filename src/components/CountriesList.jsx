import React from "react";
import CountryCard from "./CountryCard";
import { useEffect, useState } from "react";
import CountriesListShimmer from "./CountriesListShimmer";

const CountriesList = ({ query }) => {
  const [countriesData, setCountriesData] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountriesData(data));
  }, []);
  if (countriesData.length === 0) {
    return <CountriesListShimmer />;
  }
  return (
    <div className="countries-container">
      {countriesData
        .filter(
          (country) =>
            country.name.common.toLowerCase().includes(query) ||
            country.region.toLowerCase().includes(query)
        )
        .map((country) => {
          return (
            <CountryCard
              key={country.name.common}
              name={country.name.common}
              flag={country.flags.svg}
              flagalt={country.flags.alt}
              population={country.population.toLocaleString("en-IN")}
              region={country.region}
              capital={country.capital?.[0]}
              data={country}
            />
          );
        })}
    </div>
  );
};

export default CountriesList;
