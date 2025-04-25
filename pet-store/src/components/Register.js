import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Uvozimo useNavigate hook

const Register = ({ setUserData, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    favoritePets: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicijalizujemo useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const phoneRegex = /^[0-9]{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      setError("Telefon mora da sadrži tačno 9 brojeva.");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Unesite validan email.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Lozinka mora da sadrži barem 6 karaktera.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    localStorage.setItem("userData", JSON.stringify(formData));
    setUserData(formData);
    
    // Nakon uspešne registracije, prebacujemo korisnika na stranicu za prijavu
    navigate("/login"); // Putanja do stranice za prijavu
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-sky-300 to-blue-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Registracija</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="Ime"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Prezime"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Telefon"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              placeholder="Adresa"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="favoritePets"
              placeholder="Omiljene vrste ljubimaca (razdvojene zarezima)"
              value={formData.favoritePets}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Korisničko ime"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Lozinka"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Registruj se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;



