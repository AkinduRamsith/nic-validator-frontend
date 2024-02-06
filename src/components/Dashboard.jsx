import React, { useState,useEffect } from "react";
import { FaDatabase } from "react-icons/fa6";
import { FaMale, FaFemale } from "react-icons/fa";
import Barchart from "./Barchart";
import Piechart from "./Piechart";
function Dashboard({}) {
  const age1Male=null;
  const [data1, setData] = useState([]);
  useEffect(() => {

    fetch("http://localhost:8080/api/v1/validator/getDashboardInfo")
      .then((response) => response.json())
      .then((data1) => {
       
        setData(data1);
    

        setUserData({
          ...userData,
          datasets: [
            {
              ...userData.datasets[0],
              data: [data1.age1Male, data1.age2Male, data1.age3Male, data1.age4Male],
            },
            {
              ...userData.datasets[1],
              data: [data1.age1Female, data1.age2Female, data1.age3Female, data1.age4Female],
            },
          ],
        });


        setPieChartData({
          labels: ["Vote", "non-vote"],
          datasets: [
            {
              label: "Voters",
              data: [(data1.voters / data1.totalNIC) * 100, 100 - (data1.voters / data1.totalNIC) * 100],
            },
          ],
        });

        
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  const [userData, setUserData] = useState({
    labels: ["18-25", "25-45", "45-65", "65>"],
    datasets: [
      {
        label: "Male",
        backgroundColor: "#3498db",
        borderColor: "#2980b9",
        borderWidth: 1,
        data: [0, 0, 0, 0], 
      },
      {
        label: "Female",
        backgroundColor: "rgb(255, 99, 132)",
        borderWidth: 1,
        data: [0, 0, 0, 0], 
      },
    ],
  });
  const [piechart, setPieChartData] = useState({
    labels: ["Vote", "non-vote"],
    datasets: [
      {
        label: "Voters",
        data: [0, 100], 
      },
    ],
  });
  return (
    <div className=" w-full h-screen absolute">
      <div className="max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full items-center md:mt-[100px]  lg:mt-[40px] mt-96">
        {/* Conatiner */}
        <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-2 md:gap-20  md:w-[670px]  border-black sm:w-[530px]  justify-center md:items-center">
          {/* Grid Item */}

          <div className="shadow-lg shadow-[#040c16] group container sm:w-[230px]  rounded-md flex flex-col sm:mx-[-20px] md:mx-[-40px] content-div hover:scale-90 duration-500">
            <div className=" mx-auto flex gap-40 sm:gap-32 mt-7  md:gap-20  ">
              <p className="text-[17px] font-bold">Total NICs</p>
              <FaDatabase className="text-4xl sm:text-3xl" />
            </div>
            <p className="my-4 text-5xl mx-9">{data1.totalNIC}</p>
          </div>

          <div className="shadow-lg shadow-[#040c16] group container sm:w-[230px]  rounded-md flex flex-col sm:mx-[-20px] md:mx-[-40px] content-div hover:scale-90 duration-500">
            <div className=" mx-auto flex gap-40 sm:gap-32 mt-7  md:gap-20  ">
              <p className="text-[20px] font-bold">Male</p>
              <FaMale className="text-5xl sm:text-3xl" />
            </div>
            <p className="my-4 text-5xl mx-9">{data1.totalMale}</p>
          </div>

          <div className="shadow-lg shadow-[#040c16] group container sm:w-[230px]  rounded-md flex flex-col sm:mx-[-20px] md:mx-[-40px] content-div hover:scale-90 duration-500">
            <div className=" mx-auto flex gap-40 sm:gap-32 mt-7 md:gap-20  ">
              <p className="text-[20px] font-bold">Female</p>
              <FaFemale className="text-5xl sm:text-3xl" />
            </div>
            <p className="my-4 text-5xl mx-9">{data1.totalFemale}</p>
          </div>
        </div>

        <div></div>

        <div className="md:flex block d-block  gap-10 mt-12  justify-center items-center ">
          <div className="w-[300px] md:w-[700px] sm:w-[380px] mt-5 justify-center md:justify-center md:items-center md:h-[380px]  items-center ">
            <Barchart chartdata={userData} />
          </div>
          <div className="w-[300px] md:w-[380px] md:justify-center md:items-center md:mx-12 md:h-[400px]  mt-5 justify-center items-center ">
            <Piechart chartdata={piechart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
