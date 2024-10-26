







// Main code



import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/SignUpFormPatient.css"; // Use the same styling file as the patient form

const LoginPatient = () => {
  const initialFormState = {
    
    email: "",
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
        "http://localhost:3000/patient/login",
        formData
      );
      toast.success("Patient logged in successfully");
      setFormData(initialFormState);
      console.log(response.data);
    } catch (error) {
      toast.error("Error logging in, please try again.");
      console.error(error);
    }
  };

  return (
    <>
      {/* <h2 className="text-lg">Doctor Signup</h2> */}
      <label className="text-lg  font-bold">Patient Login</label>
      <div className="mt-2 w-full min-h-[50vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 w-full sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <form onSubmit={handleSubmit}>
            

            <div>
              <label className="text-lg text-zinc-500 font-semibold">Email:</label>
              <input className='bg-transparent border border-zinc-100 rounded w-full p-2 mt-1'
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>



            <div>
              <label className="text-lg text-zinc-500 font-semibold">Password:</label>
              <input className='bg-transparent border border-zinc-100 rounded w-full p-2 mt-1'
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
              Login
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginPatient;