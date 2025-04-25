import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Uvozimo useNavigate hook
import axios from "axios"; // Uvozimo axios za slanje zahteva ka Rasa API-u

const Login = ({ setUserData, setIsLoggedIn }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicijalizujemo useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulacija prijave sa lokalnim podacima
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (
      savedData &&
      savedData.username === credentials.username &&
      savedData.password === credentials.password
    ) {
      setUserData(savedData); // Postavljanje podataka u aplikaciju
      setIsLoggedIn(true); // Postavljanje statusa prijavljenosti
      localStorage.setItem("isLoggedIn", "true");

      // Poslati zahtev Rasa botu da postavimo slot 'is_logged_in' na true
      try {
        await axios.post("http://localhost:5005/webhooks/rest/webhook", {
          sender: "user",
          message: "Postavi me kao prijavljenog",
          metadata: {
            is_logged_in: true,
          },
        });
      } catch (error) {
        console.error("Greška pri postavljanju slota:", error);
      }

      // Nakon uspešne prijave, prebacujemo korisnika na početnu stranicu
      navigate("/"); // Putanja do početne stranice (App.js)
    } else {
      setError("Pogrešno korisničko ime ili lozinka");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-sky-300 to-blue-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Prijava</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Korisničko ime"
              value={credentials.username}
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
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;



