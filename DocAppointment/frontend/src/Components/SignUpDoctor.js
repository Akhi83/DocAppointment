







// Main code



import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/SignUpFormPatient.css"; // Use the same styling file as the patient form

const SignUpDoctor = () => {
  const initialFormState = {
    name: "",
    email: "",
    mobile: "",
    specialization: "",
    experience: "",
    available_days: "",
    available_time_slots: "",
    hospital: "",
    ratings: 0,
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
        "http://localhost:3000/doctor/signup",
        formData
      );
      toast.success("Doctor registered successfully");
      setFormData(initialFormState);
      console.log(response.data);
    } catch (error) {
      toast.error("Error signing up, please try again.");
      console.error(error);
    }
  };

  return (
    <>
      {/* <h2 className="text-lg">Doctor Signup</h2> */}
      <label className="text-lg  font-bold">Doctor Signup</label>
      <div className="mt-2 w-full min-h-[50vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 w-full sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <label className="w-full text-lg text-zinc-500 font-semibold">Name:</label>
              <input className=' w-full bg-transparent border border-zinc-100 rounded w-full p-2 mt-1'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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
              <label className="text-lg text-zinc-500 font-semibold">Mobile:</label>
              <input className='bg-transparent border border-zinc-100 rounded w-full p-2 mt-1'
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-lg text-zinc-500 font-semibold">Specialization:</label>
              <input className='bg-transparent border border-zinc-100 rounded w-full p-2 mt-1'
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-lg text-zinc-500 font-semibold">Experience (years):</label>
              <input className='bg-transparent border border-zinc-100 rounded w-full p-2 mt-1'
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-lg text-zinc-500 font-semibold">Available Days:</label>
              <input className='bg-transparent border border-zinc-100 rounded w-full p-2 mt-1'
                type="text"
                name="available_days"
                value={formData.available_days}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-lg text-zinc-500 font-semibold">Available Time Slots:</label>
              <input className='bg-transparent border border-zinc-100 rounded w-full p-2 mt-1'
                type="text"
                name="available_time_slots"
                value={formData.available_time_slots}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-lg text-zinc-500 font-semibold">Hospital:</label>
              <input className='bg-transparent border border-zinc-100 rounded w-full p-2 mt-1'
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-lg text-zinc-500 font-semibold">Username:</label>
              <input className='bg-transparent border border-zinc-100 rounded w-full p-2 mt-1'
                type="text"
                name="username"
                value={formData.username}
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
              Signup
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignUpDoctor;

// import React, { useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import './Styles/SignUpFormPatient.css';  // Use the same styling file as the patient form

// const SignUpDoctor = () => {
//     const initialFormState = {
//         name: '',
//         email: '',
//         mobile: '',
//         specialization: '',
//         experience: '',
//         available_days: '',
//         available_time_slots: '',
//         hospital: '',
//         ratings: 0,
//         username: '',
//         password: ''
//     };

//     const [formData, setFormData] = useState(initialFormState);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(
//                 "http://localhost:3000/doctor/signup",
//                 formData
//             );
//             toast.success("Doctor registered successfully");
//             setFormData(initialFormState);
//             console.log(response.data);
//         } catch (error) {
//             toast.error("Error signing up, please try again.");
//             console.error(error);
//         }
//     };

//     return (
//         <div className="fancy-signup-container">
//             <h2 className="fancy-signup-title">Doctor Signup</h2>
//             <form className="fancy-signup-form" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Name:</label>
//                     <input className="bg-black"
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Mobile:</label>
//                     <input
//                         type="text"
//                         name="mobile"
//                         value={formData.mobile}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Specialization:</label>
//                     <input
//                         type="text"
//                         name="specialization"
//                         value={formData.specialization}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Experience (years):</label>
//                     <input
//                         type="number"
//                         name="experience"
//                         value={formData.experience}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Available Days:</label>
//                     <input
//                         type="text"
//                         name="available_days"
//                         value={formData.available_days}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Available Time Slots:</label>
//                     <input
//                         type="text"
//                         name="available_time_slots"
//                         value={formData.available_time_slots}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Hospital:</label>
//                     <input
//                         type="text"
//                         name="hospital"
//                         value={formData.hospital}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Username:</label>
//                     <input
//                         type="text"
//                         name="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <button className='bg-purple-400 text-white w-full py-2 mt-3 rounded-md text-base hover:bg-purple-200 hover:text-black' type="submit">Signup</button>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// };

// export default SignUpDoctor;
