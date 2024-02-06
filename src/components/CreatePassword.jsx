import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

function CreatePassword({props}) {
  let {email}=useParams();
  const navigate = useNavigate();
  

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");



  const handleSubmit = (e) => {
   
    e.preventDefault();

    
   
    if (newPassword !== confirmNewPassword) {
      
      setResponseMessage("Passwords do not match");
      alert(responseMessage);
      return;
    }


    fetch(
      `http://localhost:8080/api/v1/user/set-new-password?email=${email}&newPassword=${newPassword}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.text().then((data) => {
            setResponseMessage(data);
            navigate("/"); 
          });
        } else {
          return response.text();
        }
      })
      
      .catch((error) => {
        console.error("Error setting new password:", error);
        setResponseMessage(error.message || "Error setting new password");
      });
  };
  return (
    <div className="App text-white h-[100vh] flex justify-center items-center bg-cover">
      <div className="bg-slate-800 border border-slate-400 rounded-md p-6 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        
        <h1 className="text-3xl text-white font-bold text-center mb-7">
          Create Password
        </h1>

        <form action="" onSubmit={handleSubmit}>
          <div className="relative my-10">
            <input
              className="block w-64 py-2.3 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blur-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:text-white peer"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder=""
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-90 peer-placeholder-shown:-translate-y-8 peer-focus:scale-75 peer:focus:-translate-y-6">
              New Password
            </label>

  
          </div>
          <div className="relative my-10">
            <input
              className="block w-64 py-2.3 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blur-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:text-white peer"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              placeholder=""
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-90 peer-placeholder-shown:-translate-y-8 peer-focus:scale-75 peer:focus:-translate-y-6">
              Confirm New Password
            </label>

            
          </div>

          <div className="relative my-4 flex justify-center items-center">
            <button
              className="w-36  text-[12px]  rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
              type="submit"
              >
              Submit Password
            </button>
          </div>

          <div className="mt-4">
            <span className="mt-4">
              Remember Your Password?{" "}
              <Link className="text-blue-700" to="/">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePassword;
