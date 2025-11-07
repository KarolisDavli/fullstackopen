import {useState} from "react";
import Country from "./Country";

const Countries = ({filteredCountries}) => {
  const [countryToShow, setCountryToShow] = useState(null);

  const handleShowCountry = (selectedCountry) => {
    setCountryToShow(
      countryToShow === selectedCountry ? null : selectedCountry
    );
  };

  if (filteredCountries.length === 0) {
    return <div>No matches found</div>;
  } else if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  }

  return filteredCountries.slice(0, 10).map((country) => (
    <div key={country.cca2}>
      <span>{country.name.common} </span>
      <button onClick={() => handleShowCountry(country.cca2)}>
        {countryToShow === country.cca2 ? "Hide" : "Show"}
      </button>
      {countryToShow === country.cca2 && <Country country={country} />}
    </div>
  ));
};

export default Countries;
