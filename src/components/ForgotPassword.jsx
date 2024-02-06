/* eslint-disable no-undef */
import React, { useState,useParams } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function ForgotPassword() {
 
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [enteredOTP, setEnteredOTP] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/v1/user/forgot-password?email=${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          return response.text().then((data) => {
            setResponseMessage(data);
          });
        }
      })
      
      .catch((error) => {
        
        setResponseMessage(error.message || "Error submitting form");
        alert(responseMessage);
      });
  };

  const handleValidateOTP = () => {
    fetch(`http://localhost:8080/api/v1/user/validate-otp?email=${email}&otp=${enteredOTP}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text().then((data=>{
            
            if (data === "OTP Validated") {
            
              navigate(`/createpassword/${email}`);
              
            }
          
          }));
        } else {
          return response.text();
        }
      })
     
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="App text-white h-[100vh] flex justify-center items-center bg-cover">
      <div className="bg-slate-800 border border-slate-400 rounded-md p-6 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        {/* <Navbar isAuthenticated={false} /> */}
        <h1 className="text-3xl text-white font-bold text-center mb-7">
          Forgot Password
        </h1>
        <p className="text-center text-sm mb-9">OTP will be send to your email address</p>
        <form action="" onSubmit={handleSubmit}>

          <div className="relative my-10">
            <input
              className="block w-64 py-2.3 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blur-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:text-white peer"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=""
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-90 peer-placeholder-shown:-translate-y-8 peer-focus:scale-75 peer:focus:-translate-y-6">
              Enter your Email Address
            </label>
            <button className="w-24  text-[12px] mt-6 self-center rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-1 transition-colors duration-300"
          type="submit">Submit Email</button>
          
          </div>

       
         
        

          
        </form>
        <div className="relative my-4 flex">
            <input
              className="block w-28 py-2.3 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blur-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:text-white peer"
              type="password"
              value={enteredOTP}
              onChange={(e) => setEnteredOTP(e.target.value)}
              required
              placeholder=""
            />
            <button className="w-24  text-[12px]  rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
          type="submit" onClick={handleValidateOTP}>Submit OTP</button>
      </div>
      <div className="mt-4">
            <span className="mt-4">
             Remember Your Password?{" "}
              <Link className="text-blue-700" to="/">
                Login
              </Link>
            </span>
          </div>
      </div>
    </div>
  )
}

export default ForgotPassword
