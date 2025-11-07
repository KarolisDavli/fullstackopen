import {useState, useEffect} from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const filteredCountries = search
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <>
      <div>
        find countries <input value={search} onChange={handleChange} />
      </div>
      <div>{search && <Countries filteredCountries={filteredCountries} />}</div>
    </>
  );
}

export default App;
