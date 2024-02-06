import React, { useState } from "react";

function Validator() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [nicDetails, setNicDetails] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const selectedFilesArray = Array.from(files);

    if (selectedFilesArray.length >= 4) {
      setSelectedFiles(selectedFilesArray);
    } else {
      alert("Please select at least four files.");

      e.target.value = null;
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
  
    selectedFiles.forEach((file, index) => {
      formData.append('file', file);
    });
  
    fetch("http://localhost:8080/api/v1/validator/savenic", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error uploading files");
        }
      })
      .then((data) => {
        setNicDetails(data);
      })
      .catch((error) => {
        alert("Error uploading files:", error.message);
      });
  };
  return (
    <div className=" w-full h-screen absolute">
      <div className="max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full items-center md:mt-[100px]  lg:mt-[70px] mt-96">
        <div className="flex justify-center items-center w-72  sm:w-[500px] md:w-[700px]          lg:w-[970px] 2xl:w-[1500px] mt-[-650px] sm:mt-[50px] md:mt-[-100px] lg:mt-[-180px] rounded bg-white border border-black">
          <input
            multiple
            type="file"
            name="csv"
            id="csv-upload"
            className="w-full  bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none"
            placeholder="Upload Your CSV(Minimum 4 CSV)"
            onChange={handleFileChange}
          />
          <button className="m-2 rounded bg-teal-800 px-4 py-2 text-white" onClick={handleUpload}>
            Upload
          </button>
        </div>

        
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-7 overflow-y-scroll max-h-[500px]">
          {nicDetails.map((item, index) => (
            <div key={index} className="bg-white space-y-3 p-4 rounded-lg shadow">
              <div className="flex items-center space-x-2 text-sm">
                <div>
                  <a href="#" className="text-blue-500 font-bold hover:underline">
                    {index + 1}
                  </a>
                </div>
                <div className="text-gray-500">
                  Age : <span>{item.age}</span>{" "}
                </div>
                <div>
                  <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                    Gender :<span>{item.gender}</span>
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-700">
                NIC :<span>{item.nic}</span>
              </div>
              <div className="text-sm font-medium text-black">
                Birthday :<span>{item.birthday}</span>{" "}
              </div>
            </div>
          ))}

          </div>
        
      </div>
    </div>
  );
}

export default Validator;
