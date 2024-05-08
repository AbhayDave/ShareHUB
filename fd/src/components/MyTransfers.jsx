import { useEffect, useState } from "react";
import { APIService } from "../api/fileService";

function MyTransfers() {
  const [uploads, setUploads] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await APIService({}, `api/files/`, "GET");
      const processedData = [];
      for (const item of data) {
        // Process each item in data (e.g., format date, etc.)
        processedData.push(item);
      }
      setUploads(processedData);
    };

    fetchData();
  }, []);

  const handleClick = async (id) => {
    try {
      await navigator.clipboard.writeText(
        `http://localhost:5173/download/${id}`
      );
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-evenly min-h-72">
      <h1 className="text-6xl">Your Transfers:</h1>

      <div className="w-2/3 space-y-5">
        {uploads.map((upload) => {
          return (
            <div
              key={upload._id}
              className="bg-primary rounded-2xl py-3 flex items-center justify-around px-2"
            >
              <div className="">{upload.name}</div>
              <button onClick={() => {handleClick(upload._id);}} className="btn">
                Copy Download Link
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyTransfers;
