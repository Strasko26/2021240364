import React, { useState } from "react";

const Profile = ({ userData, setUserData }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(formData));
    setUserData(formData);
    setEditMode(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-sky-300 to-blue-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Profil korisnika</h2>
        {editMode ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Ime</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Prezime</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Telefon</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Adresa</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Omiljeni ljubimci</label>
              <input
                type="text"
                name="favoritePets"
                value={formData.favoritePets}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            >
              Spremi promene
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p><strong>Ime:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Telefon:</strong> {formData.phone}</p>
            <p><strong>Adresa:</strong> {formData.address}</p>
            <p><strong>Omiljeni ljubimci:</strong> {formData.favoritePets}</p>
            <button
              onClick={() => setEditMode(true)}
              className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            >
              Izmeni profil
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

