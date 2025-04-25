import React, { useState, useEffect } from "react";

const Cart = ({ cart, changeStatus, removeFromCart, addToCart }) => {
  const [searchQuery, setSearchQuery] = useState(""); // Pretraga porudžbina
  const [ratings, setRatings] = useState({}); // Ocene po ID-ju ljubimca

  // Filtrira ljubimce po imenu
  const filterPets = () => {
    if (searchQuery) {
      return cart.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return cart;
  };

  // Računa ukupnu cenu svih ljubimaca u filtriranoj korpi
  const totalPrice = filterPets().reduce((acc, pet) => acc + Number(pet.price), 0);

  // Funkcija za postavljanje ocene
  const handleRating = (petId, value) => {
    setRatings((prev) => ({
      ...prev,
      [petId]: value,
    }));
  };

  return (
    <div className="cart-container p-4 border rounded w-full max-w-lg mx-auto bg-white shadow-md">
      <h2 className="text-3xl font-semibold text-blue-800 text-center mb-4">Vaša Korpa</h2>

      {/* Pretraga */}
      <input
        type="text"
        placeholder="Pretraži ljubimce"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 w-full p-2 border rounded"
      />

      {cart.length > 0 ? (
        <>
          <ul>
            {filterPets().map((pet, index) => (
              <li key={index} className="flex flex-col gap-2 mb-6 border-b pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-blue-800">{pet.name}</h3>
                      <p>{pet.species} | {pet.age} godina | {pet.size}</p>
                      <p className="text-gray-600">{pet.description}</p>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-blue-700">{pet.price} RSD</div>
                </div>

                {/* Status i akcije */}
                <div className="flex justify-between items-center">
                  <div className={`text-sm font-medium px-3 py-1 rounded ${
                    pet.status === "u toku" ? "bg-yellow-100 text-yellow-800" :
                    pet.status === "otkazano" ? "bg-red-100 text-red-800" :
                    pet.status === "preuzeto" ? "bg-green-100 text-green-800" : ""
                  }`}>
                    {pet.status}
                  </div>

                  <div className="flex space-x-2">
                    {(pet.status === "u toku" || pet.status === "otkazano") && (
                      <button
                        onClick={() => changeStatus(pet.id, "preuzeto")}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Preuzeto
                      </button>
                    )}

                    {pet.status === "u toku" && (
                      <button
                        onClick={() => changeStatus(pet.id, "otkazano")}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Otkaži
                      </button>
                    )}

                    {(pet.status === "preuzeto" || pet.status === "otkazano") && (
                      <button
                        onClick={() => removeFromCart(pet.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                      >
                        Obriši
                      </button>
                    )}
                  </div>
                </div>

                {/* Ocenjivanje */}
                {pet.status === "preuzeto" && (
                  <div className="flex items-center space-x-1 mt-2">
                    <span className="text-sm text-gray-700 mr-2">Oceni:</span>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span
                        key={value}
                        className={`text-2xl cursor-pointer ${
                          ratings[pet.id] >= value ? "text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => handleRating(pet.id, value)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Ukupna cena */}
          <div className="text-right mt-4 text-xl font-bold text-blue-800">
            Ukupno: {totalPrice.toLocaleString()} RSD
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">Korpa je prazna.</p>
      )}
    </div>
  );
};

export default Cart;
