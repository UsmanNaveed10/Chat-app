import React, { useState } from "react"; // Make sure useState is imported
import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox"; // Ensure GenderCheckbox is properly imported
import useSignup from "../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: ""
  });

   const {loading, signup} = useSignup();


  const handleCheckBoxChange = (gender) =>{
    setInputs({...inputs,gender})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-400">
          SignUp To <span className="text-blue-500">ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full input input-bordered h-10"
              value={inputs.fullname}
              onChange={(e) => setInputs({...inputs, fullname: e.target.value })}
            />
          </div>

          {/* Username */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) => setInputs({...inputs, username: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full h-10"
              value={inputs.password}
              onChange={(e) => setInputs({...inputs, password: e.target.value })}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full h-10"
              value={inputs.confirmpassword}
              onChange={(e) => setInputs({ ...inputs, confirmpassword: e.target.value })}
            />
          </div>

          {/* Gender Checkbox */}
          <div className="mt-2">
            <label>Select Gender</label>
          </div>
          <GenderCheckbox onCheckBoxChange={handleCheckBoxChange} selectedGender= {inputs.gender}/>

          {/* Link to Login */}
          <Link to="/login" className="text-sm hover:underline hover:text-black mt-2 inline-block">
            Already have an account?
          </Link>

          {/* Submit Button */}
          <div>
            <button className="btn btn-block btn-sm mt-2" type="submit" disabled={loading}>
            {loading ? <span className='loading loading-spinner'></span> :
              " Sign Up" }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;





//starter code for signup component

// import { Link } from "react-router-dom";
// import GenderCheckbox from "./GenderCheckbox";

// const SignUp = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//         <h1 className="text-3xl font-semibold text-center text-gray-400">
//         SignUp To
//           <span className="text-blue-500"> ChatApp</span>
          
//         </h1>
//         <form>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text"> Full Name</span>

//             </label>
//             <input type="text" placeholder="Enter Full Name" className="w-full input input-bordered h-10"></input>
            
//           </div>

//           <div>

//           <label className="label p-2">
//               <span className="text-base label-text"> Username</span>

//             </label>
//             <input type="text" placeholder="Enter Username" className="w-full input input-bordered h-10"></input>

          

//           </div>

          

//           <div>
//             <label className="label">
//             <span className="text-base label-text"> Confirm Password</span>
//             </label>
//             <input
//             type="password"
//               placeholder="Confirm Password"
//                className="input input-bordered  w-full h-10" />

//           </div>

//           <div>
//             <label className="label">
//             <span className="text-base label-text"> Confirm Password</span>
//             </label>
//             <input
//             type="password"
//               placeholder="Confirm Password"
//                className="input input-bordered  w-full h-10" />
//            </div>

//            <div className=" Gender mt-2 ">
//             <label>Select Gender</label>

//            </div>

//           <GenderCheckbox/>

//           <a href="#" className="text-sm hover:underline hover:text-black mt-2 inline-block">
//             Already have an account?
//           </a>
          
//            <div>
//             <button className=" btn btn-block btn-sm mt-2">Sign Up</button>
//            </div>
//         </form>
        
//       </div>
//     </div>
//   );
// };

// export default SignUp;

