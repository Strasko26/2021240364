import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import pets from "./data/pets";
import SearchPage from "./components/SearchPage";
import Chatbot from "./components/Chatbot";
import PetDetails from "./components/PetDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [cart, setCart] = useState([]); // Korpa koja sadrži ljubimce
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status prijave
  const [userData, setUserData] = useState(null); // Podaci o korisniku

  useEffect(() => {
    // Proveravamo da li su podaci o korisniku sačuvani u localStorage pri učitavanju aplikacije
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (savedData) {
      setUserData(savedData);
      setIsLoggedIn(true);
    }
  }, []);

  // Funkcija za dodavanje ljubimca u korpu (samo ako je korisnik prijavljen)
  const addToCart = (pet) => {
    if (isLoggedIn) {
      setCart((prevCart) => [
        ...prevCart,
        { ...pet, status: "u toku" } // Dodajemo status 'u toku'
      ]);
      alert(`${pet.name} je uspešno dodat u korpu!`);
    } else {
      alert("Morate biti prijavljeni da biste dodali ljubimca u korpu.");
    }
  };

  // Funkcija za promenu statusa rezervacije
  const changeStatus = (petId, newStatus) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === petId ? { ...item, status: newStatus } : item
      )
    );
  };

  // Funkcija za brisanje rezervacije iz korpe
  const removeFromCart = (petId) => {
    const newCart = cart.filter((item) => item.id !== petId);
    setCart(newCart);
  };

  // Funkcija za odjavu korisnika
  const handleLogout = () => {
    // Obriši korisničke podatke iz localStorage
    localStorage.removeItem("userData");
  
    // Resetuj stanje u aplikaciji
    setUserData(null);
    setIsLoggedIn(false);
  
    // Takođe postavi isLoggedIn u 'false' u localStorage
    localStorage.setItem("isLoggedIn", "false");
  

  };
  

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-sky-300 to-blue-400 p-6">
        {/* Header */}
        <header className="bg-white shadow-md rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-semibold text-blue-900">Pet Store</div>
            <nav className="space-x-6 text-gray-700">
              <Link to="/" className="hover:text-blue-500">Početna</Link>
              <Link to="/pretraga" className="hover:text-blue-500">Pretraga</Link>
              <Link to="/korpa" className="hover:text-blue-500">Korpa ({cart.length})</Link>
              {isLoggedIn ? (
                <>
                  <Link to="/profil" className="hover:text-blue-500">Profil</Link>
                  <button onClick={handleLogout} className="hover:text-blue-500">
                    Odjavi se
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-blue-500">Prijava</Link>
                  <Link to="/register" className="hover:text-blue-500">Registracija</Link>
                </>
              )}
              <button onClick={() => setIsChatOpen(!isChatOpen)} className="hover:text-blue-500">
                {isChatOpen ? "Zatvori agenta" : "Agent"}
              </button>
            </nav>
          </div>
        </header>

        {/* Chatbot Overlay */}
        {isChatOpen && (
          <div className="fixed bottom-6 right-6 z-50 w-full max-w-md">
            <Chatbot addToCart={addToCart} pets={pets} isLoggedIn={isLoggedIn} />
          </div>
        )}

        {/* Routing */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero Section */}
                <section
                  className="hero bg-cover bg-center text-center text-white py-24 rounded-xl mb-8"
                  style={{ backgroundImage: "url('https://example.com/hero-image.jpg')" }}
                >
                  <h1 className="text-4xl font-bold mb-4">
                    Dobrodošli u Pet Store – Vaše mesto za ljubimce iz snova
                  </h1>
                  <p className="text-lg mb-6">
                    Pronađite ljubimca svog života i uživajte u društvu svog novog prijatelja!
                  </p>
                  <Link to="/pretraga">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
                      Pogledaj ljubimce
                    </button>
                  </Link>
                </section>

                {/* Pet Cards */}
                <main className="max-w-6xl mx-auto mb-16">
                  <h2 className="text-3xl font-semibold text-blue-800 text-center mb-8">
                    Naši Ljubimci
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {pets.map((pet) => (
                      <div key={pet.id} className="bg-white rounded-2xl shadow-xl p-4">
                        <img
                          src={pet.image}
                          alt={pet.name}
                          className="w-full h-56 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold text-blue-800">{pet.name}</h3>
                        <p className="text-gray-700">
                          {pet.species} | {pet.age} godina | {pet.size}
                        </p>
                        <p className="text-gray-600 mb-4">{pet.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-lg font-semibold text-blue-700">{pet.price} RSD</div>
                          <div className="text-yellow-500">
                            {"★".repeat(pet.reviewsSummary)}{"☆".repeat(5 - pet.reviewsSummary)}
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-4">
                          <Link to={`/pets/${pet.id}`}>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl w-full">
                              Detalji
                            </button>
                          </Link>
                          <button
                            onClick={() => addToCart(pet)} // Dodajemo pet u korpu
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl w-full"
                          >
                            Dodaj u korpu
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </main>
              </>
            }
          />
          <Route path="/pretraga" element={<SearchPage />} />
          <Route path="/pets/:petId" element={<PetDetails />} />
          <Route
            path="/korpa"
            element={isLoggedIn ? <Cart cart={cart} changeStatus={changeStatus} removeFromCart={removeFromCart} /> : <Navigate to="/login" />}
          />
          <Route path="/profil" element={isLoggedIn ? <Profile userData={userData} setUserData={setUserData} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setUserData={setUserData} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register setUserData={setUserData} setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-white shadow-md rounded-2xl p-6 mt-16 text-center">
          <p className="text-gray-600">© 2025 Pet Store. Sva prava rezervisana.</p>
          <p className="text-gray-500 text-sm mt-2">
            <a href="#terms" className="hover:text-blue-500">Uslovi korišćenja</a> |{" "}
            <a href="#privacy" className="hover:text-blue-500">Politika privatnosti</a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
