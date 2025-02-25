import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./CountryDetail.css";
import { Link, useParams } from "react-router";
import { useLocation } from "react-router";
import { useTheme } from "../hooks/useTheme";
import CountryDetailShimmer from "./CountryDetailShimmer";

function CountryDetail() {
  const params = useParams();
  const countryName = params.country;
  console.log(countryName);
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { state } = useLocation();
  console.log(state);
  const [isDark, setIsDark] = useTheme();

  function updatedCountry(data) {
    setCountryData({
      name: data.name.common || data.name,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common, //why use object.values - when value of object is different for each  we use object.values in this nativeName is an object with different values so we use object.values
      population: data.population,
      region: data.region,
      subRegion: data.subregion,
      capital: data.capital?.join(", "), // this is a way to join the capital array with a comma
      topLevelDomain: data.tld,
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(", "), // this is a way to map the currencies object and get the name of the currency and join them with a comma
      languages: Object.values(data.languages || {}).join(", "),
      flag: data.flags.svg,
      flagalt: data.flags.alt,
      borders: [],
    });
    if (!data.borders) {
      data.borders = [];
    }
    {
      data.borders.map((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderData]) => {
            console.log(borderData.name.common);
            setCountryData((prev) => ({
              ...prev,
              borders: [...prev.borders, borderData.name.common],
            }));
          });
      });
    }
  }

  useEffect(() => {
    if (state) {
      updatedCountry(state);
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        console.log(data);
        updatedCountry(data);
      })
      .catch((err) => setNotFound(true));
  }, [countryName]);

  if (notFound) {
    return <h1>Country Not Found</h1>;
  }
  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        {countryData === null ? (
          <CountryDetailShimmer />
        ) : (
          <div className="country-details">
            <img src={countryData.flag} alt={countryData.flagalt} />
            <div className="details-text-container">
              <h1>{countryData.name}</h1>
              <div className="details-text">
                <p>
                  <b>
                    Native Name : {countryData.nativeName || countryData.name}
                  </b>
                  <span className="native-name"></span>
                </p>
                <p>
                  <b>
                    Population :{" "}
                    {countryData.population.toLocaleString("en-IN")}{" "}
                  </b>
                  <span className="population"></span>
                </p>
                <p>
                  <b>Region : {countryData.region} </b>
                  <span className="region"></span>
                </p>
                <p>
                  <b>Sub Region: {countryData.subRegion}</b>
                  <span className="sub-region"></span>
                </p>
                <p>
                  <b>Capital : {countryData.capital} </b>
                  <span className="capital"></span>
                </p>
                <p>
                  <b>Top Level Domain : {countryData.topLevelDomain} </b>
                  <span className="top-level-domain"></span>
                </p>
                <p>
                  <b>Currencies: {countryData.currencies} </b>
                  <span className="currencies"></span>
                </p>
                <p>
                  <b>Languages : {countryData.languages} </b>
                  <span className="languages"></span>
                </p>
              </div>
              {countryData.borders.length !== 0 && (
                <div className="border-countries">
                  <b>Border Countries: </b>&nbsp;
                  {countryData.borders.map((border, index) => (
                    <Link key={`${border}-${index}`} to={`/${border}`}>
                      {border}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
export default CountryDetail;
