import { useState, useEffect } from "react";
import Pet from "./Pet";
import useBreedList from "./useBreedList";
const ANIMALS = ["bird", "cat", "dog", "rabit", "reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("");
  const [location, setLocation] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">Location</label>
        <input
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          id="location"
          value={location}
          placeholder="Location"
        />
        <label htmlFor="animal">Animal</label>
        <select
          name=""
          id="animal"
          value={animal}
          onChange={(e) => {
            setAnimal(e.target.value);
            setBreed("");
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
        <select
          name=""
          disabled={!breeds.length}
          id="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        >
          <option />
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <button>Submit</button>
      </form>
      {pets.map((pet) => {
        <Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id}
        />;
      })}
    </div>
  );
};

export default SearchParams;
