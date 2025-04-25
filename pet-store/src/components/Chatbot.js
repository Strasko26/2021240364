import React, { useState } from "react";
import axios from "axios";

const Chatbot = ({ addToCart, pets, isLoggedIn }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Funkcija koja prepoznaje ime ljubimca u korisničkoj poruci
  const extractPetName = (message) => {
    const match = message.match(/(?:dodaj|detalje za|prikaži|vidim|imam|za)\s+(\w+)/i);
    return match ? match[1] : null;
  };

  // Funkcija za renderovanje poruka sa linkovima
  const renderMessage = (message) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;  // Regex za prepoznavanje URL-ova
    const parts = message.split(urlRegex);

    return parts.map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {part}
        </a>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
  
    // Dodavanje korisničke poruke
    const userMessage = { sender: "user", text: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    // Pronalazak imena ljubimca (ako postoji) u poruci
    const petName = extractPetName(userInput);
  
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
    try {
      // Slanje poruke Rasa API-ju sa entitetom pet_name i statusom prijave
      const response = await axios.post("http://localhost:5005/webhooks/rest/webhook", {
        sender: "user",
        message: userInput,
        metadata: {
          pet_name: petName || undefined,
          is_logged_in: localStorage.getItem("isLoggedIn") === "true" ? "true" : "false",  // šaljemo kao string "true" / "false"
        },
      });

      console.log("isLoggedIn:", isLoggedIn); // Dodaj ovo da vidiš šta šalješ

  
      // Obrada odgovora od bota
      const botResponses = response.data.map((msg, i) => ({
        sender: "bot",
        text: msg.text || "[Bez odgovora]",
      }));
  
      setMessages((prevMessages) => [...prevMessages, ...botResponses]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Greška u komunikaciji sa botom." },
      ]);
    }

    const match = userInput.toLowerCase().match(/dodaj\s+(.+?)\s+u\s+korpu/i);

if (isLoggedIn && match) {
  const petNameInput = match[1].trim().toLowerCase();

  // Pronađi ljubimca ignorisanjem razlike u velikim/malim slovima
  const petToAdd = pets.find((p) => p.name.toLowerCase() === petNameInput);

  if (petToAdd) {
    addToCart(petToAdd);
    console.log("✅ Ljubimac dodat u korpu iz chata:", petToAdd.name);
  } else {
    console.log("⚠️ Ljubimac nije pronađen:", petNameInput);
  }
}
    setUserInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chatbot p-4 border rounded w-full max-w-lg mx-auto bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-2">Pet Store Asistent</h2>
      <div className="messages h-96 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
            }`}
          >
            {renderMessage(msg.text)}  {/* Pozivamo renderMessage za poruku */}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="border p-2 flex-1 rounded-l"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Unesite poruku..."
        />
        <button className="bg-blue-500 text-white px-4 rounded-r" onClick={sendMessage}>
          Pošalji
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
