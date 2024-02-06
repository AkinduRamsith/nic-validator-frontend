import React, { useState, useEffect } from "react";

function Report() {
    const [data, setData] = useState([]);

    useEffect(() => {
       
        fetch("http://localhost:8080/api/v1/validator/getAll")
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) =>alert(error));
      }, []);
    const handleExportPDF = () => {
        
        fetch("http://localhost:8080/api/v1/validator/getNicAsPdf", {
          method: "GET",
        })
          .then((response) => response.blob())
          .then((blob) => {
            
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "pdf_report.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch((error) => alert(error));
      };

      const handleExportExcel = () => {
        
        fetch("http://localhost:8080/api/v1/validator/getNicAsExcel", {
          method: "GET",
        })
          .then((response) => response.blob())
          .then((blob) => {
            
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "excel_report.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch((error) =>alert("Error exporting Excel:", error));
      };

      const handleExportCSV = () => {
       
        fetch("http://localhost:8080/api/v1/validator/getnic", {
          method: "GET",
        })
          .then((response) => response.blob())
          .then((blob) => {
           
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "nic_details.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch((error) => alert("Error exporting CSV:", error));
      };
    
  return (
    
    <div className=" w-full h-screen absolute">
      <div className="max-w-[1000px] mx-auto px-8 flex flex-col justify-center items-center h-full md:mt-[100px]  lg:mt-[-50px] mt-[450px]">
        <div className="grid gap-2 md:flex md:mt-20 mt-[-670px] mx-16 mb-5 lg:mt-36 xl:mt-56">
          <button className="rounded-md bg-red-600 px-3.5 py-1.5 text-white font-bold w-48" onClick={handleExportPDF}>
            Export As PDF
          </button>
          <button className="rounded-md bg-green-700 px-3.5 py-1.5 text-white font-bold w-48"  onClick={handleExportExcel}>
            Export As Excel
          </button>
          <button className="rounded-md bg-sky-500 px-3.5 py-1.5  text-white font-bold w-48" onClick={handleExportCSV}>
            Export As CSV
          </button>
        </div>
        {/* Table */}
        <div class="overflow-auto rounded-lg shadow hidden md:block">
          <table class="md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[2300px] sm:w-[500px]">
            <thead class="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  ID
                </th>
                <th class="w-10 p-3 text-sm font-semibold tracking-wide text-left">
                  NIC
                </th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Gender
                </th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Age
                </th>
                <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Birthday
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item.id} class="bg-white">
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <a href="#" class="font-bold text-blue-500">
                    {item.id}
                  </a>
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.nic}
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <span class="p-1.5 text-xs font-medium uppercase tracking-wide rounded-lg bg-opacity-50">
                    {item.gender}
                  </span>
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.age}
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.birthday}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden overflow-y-scroll max-h-[500px]">
        {data.map((item) => (
                <div key={item.id} className="bg-white space-y-3 p-4 rounded-lg shadow">
                  <div className="flex items-center space-x-2 text-sm">
                    <div>
                      <a href="#" className="text-blue-500 font-bold hover:underline">
                        ID : {item.id}
                      </a>
                    </div>
                    <div className="text-gray-500">Age : {item.age}</div>
                    <div>
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                        {item.gender}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">NIC: {item.nic}</div>
                  <div className="text-sm font-medium text-black">Birthday: {item.birthday}</div>
                </div>
              ))}
          
         
        </div>
      </div>
    </div>
  );
}

export default Report;
