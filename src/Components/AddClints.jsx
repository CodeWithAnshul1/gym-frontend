import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddUser() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [add, setAdd] = useState("");
  const [month, setmonth] = useState("");
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 get token from localStorage
    // const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Unauthorized! Please login again");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/`, {
        method: "POST",
        credentials :"include",
        headers: {
          "Content-Type": "application/json",
          // ✅ send token in header
          // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name, number, add , month}),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Fail to add user");
        return;
      }

      toast.success(data.message);

      setName("");
      setNumber("");
      setAdd("");
      setmonth("");

    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#020617]">
      <div className='flex flex-col space-y-10 '>
        <form
          onSubmit={handleSubmit}
          className="bg-[#111827] p-8 rounded-xl shadow-md w-80 space-y-4 text-white"
        >
          <h2 className="text-2xl font-bold text-center">Add New Client</h2>

          <input
            type="text"
            placeholder="Name"
            required
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number"
            maxLength={10}
            required
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={number}
            onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))}
          />

          <input
            type="text"
            placeholder="Address"
            required
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={add}
            onChange={(e) => setAdd(e.target.value)}
          />
           <input
            type="number"
            placeholder="months"
            required
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={month}
            onChange={(e) => setmonth(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}