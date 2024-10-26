import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/Login.css"; // Import the CSS

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl =
      formData.userType === "patient"
        ? "http://localhost:3000/patient/login"
        : "http://localhost:3000/doctor/login";
    try {
      const response = await axios.post(apiUrl, {
        email: formData.email,
        password: formData.password,
      });
      toast.success(`Logged in as ${formData.userType} successfully`);
      console.log(`${formData.userType} logged in:`, response.data);
      console.log("User logged in:", response.data);
      const { token } = response.data;
      console.log(token);
    } catch (error) {
      if (error.response) {
        console.error(
          `Error logging in ${formData.userType}:`,
          error.response.data
        );
        toast.error("Login failed. Please try again.");
      } else {
        console.error(`Error logging in ${formData.userType}:`, error.message);
      }
    }
  };

  return (
    <>
      <div className="fancy-login-container">
        <h2 className="fancy-login-title">Log In</h2>
        <form className="fancy-login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Login as:</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <button className="fancy-login-btn" type="submit">
            Log In
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/patient/login",
//         formData
//       ); // Added http://
//       toast.success("Logged in successfully");
//       console.log("User logged in:", response.data);
//       const { token } = response.data;
//       console.log(token);
//       // Store token in localStorage or state
//       // Redirect or display success message
//     } catch (error) {
//       if (error.response) {
//         console.error("Error logging in user:", error.response.data); // Error response from server
//         toast.error("Login failed. Please try again.");
//       } else {
//         console.error("Error logging in user:", error.message); // Network error or other issues
//       }
//       // Display error message
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Log In</button>
//       </form>
//       <ToastContainer/>
//     </>
//   );
// }

// <ToastContainer
//   position="top-right"
//   autoClose={5000}
//   hideProgressBar={false}
//   newestOnTop={false}
//   closeOnClick
//   pauseOnFocusLoss
//   draggable
//   pauseOnHover
// />;

// export default Login;
