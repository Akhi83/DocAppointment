import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupFormPatient = () => {
  const initialFormState = {
    name: "",
    email: "",
    mobile: "",
    age: "",
    gender: "male", // Default to 'male'
    medicalHistory: "",
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/patient/signup",
        formData
      );
      toast.success("Patient registered successfully");
      setFormData(initialFormState); // Reset form to initial state
      console.log(response.data);
    } catch (error) {
      toast.error("Error signing up, please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <label className="text-lg font-bold">Patient Signup</label>
      <div className="mt-2 w-full min-h-[50vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 w-full sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <label className="w-full text-lg text-zinc-500 font-semibold">Name:</label>
              <input
                className="bg-transparent border border-zinc-100 rounded w-full p-2 mt-1"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full">
              <label className="w-full text-lg text-zinc-500 font-semibold">Email:</label>
              <input
                className="bg-transparent border border-zinc-100 rounded w-full p-2 mt-1"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full">
              <label className="w-full text-lg text-zinc-500 font-semibold">Mobile:</label>
              <input
                className="bg-transparent border border-zinc-100 rounded w-full p-2 mt-1"
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full">
              <label className="w-full text-lg text-zinc-500 font-semibold">Age:</label>
              <input
                className="bg-transparent border border-zinc-100 rounded w-full p-2 mt-1"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full">
              <label className="w-full text-lg text-zinc-500 font-semibold">Gender:</label>
              <select
                className="bg-transparent border border-zinc-100 rounded w-full p-2 mt-1"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="w-full">
              <label className="w-full text-lg text-zinc-500 font-semibold">Medical History:</label>
              <textarea
                className="bg-transparent border border-zinc-100 rounded w-full p-2 mt-1"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="w-full">
              <label className="w-full text-lg text-zinc-500 font-semibold">Username:</label>
              <input
                className="bg-transparent border border-zinc-100 rounded w-full p-2 mt-1"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full">
              <label className="w-full text-lg text-zinc-500 font-semibold">Password:</label>
              <input
                className="bg-transparent border border-zinc-100 rounded w-full p-2 mt-1"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              onClick={handleSubmit}
              className="bg-purple-400 text-white w-full py-2 mt-3 rounded-md text-base hover:bg-purple-200 hover:text-black"
              type="submit"
            >
              Signup
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignupFormPatient;
