import React, { useState } from "react";
import pets from "../data/pets";
import PetList from "./PetList";

function SearchPage() {
  const [filters, setFilters] = useState({
    species: "",
    ageMin: "",
    ageMax: "",
    size: "",
    origin: "",
    price: "",
    reviewsSummary: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = pets;

    if (filters.species) {
      filtered = filtered.filter((pet) => pet.species === filters.species);
    }

    if (filters.ageMin || filters.ageMax) {
      filtered = filtered.filter((pet) => {
        const age = parseInt(pet.age);
        const min = filters.ageMin ? parseInt(filters.ageMin) : 0;
        const max = filters.ageMax ? parseInt(filters.ageMax) : 100;
        return age >= min && age <= max;
      });
    }

    if (filters.size) {
      filtered = filtered.filter((pet) => pet.size === filters.size);
    }

    if (filters.origin) {
      filtered = filtered.filter((pet) => pet.origin === filters.origin);
    }

    if (filters.price) {
      filtered = filtered.filter(
        (pet) => parseInt(pet.price) <= parseInt(filters.price)
      );
    }

    if (filters.reviewsSummary) {
      filtered = filtered.filter(
        (pet) => pet.reviewsSummary === filters.reviewsSummary
      );
    }

    return filtered;
  };

  const filteredPets = applyFilters();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Pretraga ljubimaca</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <select
          name="species"
          value={filters.species}
          onChange={handleFilterChange}
          className="p-2 rounded-lg border"
        >
          <option value="">Vrsta</option>
          <option value="Pas">Pas</option>
          <option value="Macka">Macka</option>
          <option value="Ribica">Ribica</option>
          <option value="Ptica">Ptica</option>
        </select>

        <select
          name="ageMin"
          value={filters.ageMin}
          onChange={handleFilterChange}
          className="p-2 rounded-lg border"
        >
          <option value="">Starost od</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} godina
            </option>
          ))}
        </select>

        <select
          name="ageMax"
          value={filters.ageMax}
          onChange={handleFilterChange}
          className="p-2 rounded-lg border"
        >
          <option value="">Starost do</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} godina
            </option>
          ))}
        </select>

        <select
          name="size"
          value={filters.size}
          onChange={handleFilterChange}
          className="p-2 rounded-lg border"
        >
          <option value="">Veličina</option>
          <option value="Vrlo mala">Vrlo mala</option>
          <option value="Mala">Mala</option>
          <option value="Srednja">Srednja</option>
          <option value="Velika">Velika</option>
        </select>

        <select
          name="origin"
          value={filters.origin}
          onChange={handleFilterChange}
          className="p-2 rounded-lg border"
        >
          <option value="">Poreklo</option>
          <option value="Srbija">Srbija</option>
          <option value="Madjarska">Madjarska</option>
          <option value="Nemacka">Nemacka</option>
          <option value="Kina">Kina</option>
          <option value="Brazil">Brazil</option>
          <option value="Tajland">Tajland</option>
          <option value="Austrija">Austrija</option>
          <option value="Francuska">Francuska</option>
          <option value="Spanija">Spanija</option>
        </select>

        <select
          name="price"
          value={filters.price}
          onChange={handleFilterChange}
          className="p-2 rounded-lg border"
        >
          <option value="">Cena do</option>
          <option value="1000">1,000 RSD</option>
          <option value="5000">5,000 RSD</option>
          <option value="10000">10,000 RSD</option>
          <option value="15000">15,000 RSD</option>
          <option value="20000">20,000 RSD</option>
        </select>

        <select
          name="reviewsSummary"
          value={filters.reviewsSummary}
          onChange={handleFilterChange}
          className="p-2 rounded-lg border"
        >
          <option value="">Ocena</option>
          <option value="5">★★★★★</option>
          <option value="4">★★★★☆</option>
          <option value="3">★★★☆☆</option>
          <option value="2">★★☆☆☆</option>
          <option value="1">★☆☆☆☆</option>
        </select>
      </div>

      <PetList pets={filteredPets} />
    </div>
  );
}

export default SearchPage;

