import React, { useState, useEffect, useCallback } from "react";
import Adresse from "./components/Adresse";
import "./styles.css";

export default function App() {
  const [query, setQuery] = useState("8 bd du port");
  const [newQuery, setNewQuery] = useState();
  const [adresses, setAdresses] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const newSearch = () => {
    setQuery(newQuery);
  };
  const fetchAdresses = useCallback(async () => {
    setLoading(true);
    if (query.length >= 3) {
      const response = await fetch(
        "https://api-adresse.data.gouv.fr/search/?q=" + query
      );
      const data = await response.json();
      setAdresses(data);
    } else if (query === "") {
      setQuery("8 bd du port");
    }
    setLoading(false);
  }, [query]);

  useEffect(() => {
    fetchAdresses().catch(console.error);
  }, [fetchAdresses]);

  return (
    <div className="App">
      <h1>Addresse list</h1>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search an adress"
          onChange={(event) => setNewQuery(event.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => newSearch()}
          >
            Search
          </button>
        </div>
      </div>

      <div className="displayed-result">
        {isLoading ? (
          <div className="lds-dual-ring"></div>
        ) : adresses.features && adresses.features.length > 0 ? (
          <Adresse data={adresses.features} />
        ) : (
          <p>No result</p>
        )}
      </div>
    </div>
  );
}

// https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port

// we need to display a list of address:
// you have to retrieve the list from the url,
// show a loading indicator while fetching,
// then display somes informations from each result.
// => doc: https://adresse.data.gouv.fr/api-doc/adresse

// bonus: use an input to research an other query
