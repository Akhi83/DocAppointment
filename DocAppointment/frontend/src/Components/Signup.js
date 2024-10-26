import React, { useState } from "react";
import SignupFormDoctor from "./SignUpDoctor";
import SignupFormPatient from "./SignupPatient";
import LoginDoctor from "./LoginDoctor";
import LoginPatient from "./LoginPatient"; // Import patient login form

const Signup = () => {
  const [userType, setUserType] = useState("patient");
  const [showLogin, setShowLogin] = useState(false);

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <form className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[440px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        {showLogin ? (
          <>
            <h2 className="text-2xl font-semibold">Login</h2>
            {/* Conditionally show either the Doctor or Patient login form */}
            {userType === "patient" ? <LoginPatient /> : <LoginDoctor />}

            <p className="mt-4">
              Don't have an account?{" "}
              <span
                onClick={toggleLogin}
                className="text-purple-400 cursor-pointer hover:underline"
              >
                Sign up here
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold">Sign Up</h2>

            <div className="w-full flex justify-between gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="patient"
                  checked={userType === "patient"}
                  onChange={handleUserTypeChange}
                  className="form-radio text-purple-400"
                />
                <span className="text-lg">Sign up as Patient</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="doctor"
                  checked={userType === "doctor"}
                  onChange={handleUserTypeChange}
                  className="form-radio text-purple-400"
                />
                <span className="text-lg">Sign up as Doctor</span>
              </label>
            </div>

            <div className="w-full">
              {userType === "patient" ? (
                <SignupFormPatient />
              ) : (
                <SignupFormDoctor />
              )}
            </div>

            <p className="mt-4">
              Already have an account?{" "}
              <span
                onClick={toggleLogin}
                className="text-purple-400 cursor-pointer hover:underline"
              >
                Click here to login
              </span>
            </p>
          </>
        )}
      </div>
    </form>
  );
};

export default Signup;





// // Main code 2

// import React, { useState } from "react";
// import SignupFormDoctor from "./SignUpDoctor";
// import SignupFormPatient from "./SignupPatient";
// import LoginForm from "./LoginForm"; // Create a new login form component

// const Signup = () => {
//   const [userType, setUserType] = useState("patient");
//   const [showLogin, setShowLogin] = useState(false); // Toggle between signup and login

//   const handleUserTypeChange = (e) => {
//     setUserType(e.target.value);
//   };

//   const toggleLogin = () => {
//     setShowLogin(!showLogin);
//   };

//   return (
//     <form className="min-h-[80vh] flex items-center">
//       <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[440px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
//         {/* Conditionally show either the Signup or Login form */}
//         {showLogin ? (
//           <>
//             <h2 className="text-2xl font-semibold">Login</h2>
//             <LoginForm /> {/* Use the Login form component */}
//             <p className="mt-4">
//               Don't have an account?{" "}
//               <span
//                 onClick={toggleLogin}
//                 className="text-purple-400 cursor-pointer hover:underline"
//               >
//                 Sign up here
//               </span>
//             </p>
//           </>
//         ) : (
//           <>
//             <h2 className="text-2xl font-semibold">Sign Up</h2>

//             {/* Radio button selection for user type */}
//             <div className="w-full flex justify-between gap-4 mb-4">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="radio"
//                   value="patient"
//                   checked={userType === "patient"}
//                   onChange={handleUserTypeChange}
//                   className="form-radio text-purple-400"
//                 />
//                 <span className="text-lg">Sign up as Patient</span>
//               </label>
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="radio"
//                   value="doctor"
//                   checked={userType === "doctor"}
//                   onChange={handleUserTypeChange}
//                   className="form-radio text-purple-400"
//                 />
//                 <span className="text-lg">Sign up as Doctor</span>
//               </label>
//             </div>

//             {/* Show the appropriate form based on userType */}
//             <div className="w-full">
//               {userType === "patient" ? (
//                 <SignupFormPatient />
//               ) : (
//                 <SignupFormDoctor />
//               )}
//             </div>

//             {/* Toggle to show login form */}
//             <p className="mt-4">
//               Already have an account?{" "}
//               <span
//                 onClick={toggleLogin}
//                 className="text-purple-400 cursor-pointer hover:underline"
//               >
//                 Click here to login
//               </span>
//             </p>
//           </>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Signup;














// Main code


// import React, { useState } from "react";
// import SignupFormDoctor from "./SignUpDoctor";
// import SignupFormPatient from "./SignupPatient";

// const Signup = () => {
//   const [userType, setUserType] = useState("patient");

//   const handleUserTypeChange = (e) => {
//     setUserType(e.target.value);
//   };

//   return (
//     <form className="min-h-[80vh] flex items-center">
//       <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[440px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
//         <h2 className="text-2xl font-semibold">Sign Up</h2>

//         {/* Radio button selection for user type */}
//         <div className="w-full flex justify-between gap-4 mb-4">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               value="patient"
//               checked={userType === "patient"}
//               onChange={handleUserTypeChange}
//               className="form-radio text-purple-400"
//             />
//             <span className="text-lg">Sign up as Patient</span>
//           </label>
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               value="doctor"
//               checked={userType === "doctor"}
//               onChange={handleUserTypeChange}
//               className="form-radio text-purple-400"
//             />
//             <span className="text-lg">Sign up as Doctor</span>
//           </label>
//         </div>

//         {/* Form based on userType */}
//         <div className="w-full">
//           {userType === "patient" ? <SignupFormPatient /> : <SignupFormDoctor />}
//         </div>

//         {/* <button className="bg-purple-400 text-white w-full py-2 mt-3 rounded-md text-base hover:bg-purple-200 hover:text-black">
//           {userType === "patient" ? 'Create Patient Account' : 'Create Doctor Account'}
//         </button> */}
//       </div>
//     </form>
//   );
// };

// export default Signup;

