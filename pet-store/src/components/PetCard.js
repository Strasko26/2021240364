import React from "react";

const PetCard = ({ pet }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm">
            <img src={pet.image} alt={pet.name} className="w-full h-64 object-cover rounded-t-2xl"/>
          <h2 className="text-xl font-bold text-blue-600">{pet.name}</h2>
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
      );
    };
    
    export default PetCard;
