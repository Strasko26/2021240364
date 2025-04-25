import React from "react";
import { useParams } from "react-router-dom";
import pets from "../data/pets"; // Uvezi podatke o ljubimcima

const PetDetails = () => {
  const { petId } = useParams(); // Uzmi petId iz URL-a
  const pet = pets.find((pet) => pet.id === parseInt(petId)); // Pronađi ljubimca prema petId-u

  if (!pet) {
    return <p>Pet not found</p>; // Ako ljubimac nije pronađen, prikaži poruku
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-96 object-cover rounded-t-2xl"
        />
        <h2 className="text-2xl font-bold text-blue-600 mt-4">{pet.name}</h2>
        <p className="text-gray-700 italic mb-2">{pet.species}</p>
        <p className="text-gray-800 mb-2">
          <strong>Opis:</strong> {pet.description}
        </p>
        <p className="text-gray-800 mb-1">
          <strong>Starost:</strong> {pet.age} &nbsp;|&nbsp;
          <strong>Veličina:</strong> {pet.size}
        </p>
        <p className="text-gray-800 mb-1">
          <strong>Poreklo:</strong> {pet.origin}
        </p>
        <p className="text-green-600 font-semibold mb-1">
          <strong>Cena:</strong> {pet.price} RSD
        </p>
        <p className="text-yellow-600">
          <strong>Ocena:</strong> {pet.reviewsSummary}
        </p>
      </div>
    </div>
  );
};

export default PetDetails;
