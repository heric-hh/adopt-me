import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adoptedPet, _] = useContext(AdoptedPetContext);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">Location</label>
        <input
          name="location"
          type="text"
          id="location"
          placeholder="Location"
        />
        <label htmlFor="animal">Animal</label>
        <select
          name="animal"
          id="animal"
          value={animal}
          onChange={(e) => {
            setAnimal(e.target.value);
          }}
        >
          <option />
          {ANIMALS.map((animal) => (
            <option key={animal} value={animal}>
              {animal}
            </option>
          ))}
        </select>
        <label htmlFor="breed">Breed</label>
        <select name="breed" disabled={!breeds.length} id="breed">
          <option />
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
