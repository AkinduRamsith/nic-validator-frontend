import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  NavLink,
  Link,
} from "react-router-dom";
import { useNavigate  } from "react-router-dom";

import {BiUser} from 'react-icons/bi'
import {AiOutlineLock} from 'react-icons/ai'

function Register() {

    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
           
           alert("Password not match")
            return;
        }
    
        const userRegister={userName,email,password}
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
    
    
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(userRegister),
      redirect: 'follow'
    };
    
    fetch("http://localhost:8080/api/v1/user/save", requestOptions)
      .then(response => response.text())
      .then((result) => {
        if (result === "Sign up success") {
          
            navigate("/"); 
          } else {
            alert("Registration failed");
          }
        
       
      })
      .catch(error => alert(error));
    
       
      };
  return (
    <div className="App text-white h-[100vh] flex justify-center items-center bg-cover">
    <div className="bg-slate-800 border border-slate-400 rounded-md p-6 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
      {/* <Navbar isAuthenticated={false} /> */}
      <h1 className="text-3xl text-white font-bold text-center mb-7">
        Create Account
      </h1>
   
      <form action="" onSubmit={handleSubmit}>
        <div className="relative my-6">
          <input
            className="block w-64 py-2.3 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blur-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:text-white peer"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            placeholder=""
          />
          <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-90 peer-placeholder-shown:-translate-y-8 peer-focus:scale-75 peer:focus:-translate-y-6">
            Username
          </label>
          <BiUser className="absolute top-0 right-1"/>
        </div>
        <div className="relative my-6">
          <input
            className="block w-64 py-2.3 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blur-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:text-white peer"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=""
          />
          <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-90 peer-placeholder-shown:-translate-y-8 peer-focus:scale-75 peer:focus:-translate-y-6">
            Email
          </label>
          <BiUser className="absolute top-0 right-1"/>
        </div>

        <div className="relative my-6">
          <input
            className="block w-64 py-2.3 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blur-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:text-white peer"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=""
          />
          <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-90 peer-placeholder-shown:-translate-y-8 peer-focus:scale-75 peer:focus:-translate-y-6">
            Password
          </label>
          <AiOutlineLock className="absolute top-0 right-1"/>
        </div>
       

        <div className="relative my-4">
          <input
            className="block w-64 py-2.3 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blur-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:text-white peer"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder=""
          />
          <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-90 peer-placeholder-shown:-translate-y-8 peer-focus:scale-75 peer:focus:-translate-y-6">
           Confirm Password
          </label>
          <AiOutlineLock className="absolute top-0 right-1"/>
        </div>
       

        <button
          className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
          type="submit"
        >
          Sign Up
        </button>

        <div className="mt-4">
          <span className="mt-4">
           Already Create an Account ?{" "}
            <Link className="text-blue-700" to="/">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Register