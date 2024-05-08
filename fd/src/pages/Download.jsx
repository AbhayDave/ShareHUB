import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIService } from "../api/fileService";
import service from "../appwrite/appwrite";

function Download() {
  const { id } = useParams();
  const [files, setFiles] = useState([]);

  const [isExpired, setIsExpired] = useState(false);

  const fetchTransferData = async () => {
    const data = await APIService({}, `api/files/${id}`, "GET");
    if (data.error) {
      setIsExpired(true);
    }
    // console.log(data);
    setFiles(data);
  };

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(
        `http://localhost:5173/download/${id}`
      );
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const handleDownload = async (fileId, fileName) => {
    try {
      const downloadLink = await service.getFileDownload(fileId);

      const response = await fetch(downloadLink);
      if (!response.ok) {
        throw new Error(`Error downloading file: ${response.statusText}`);
      }

      const blob = await response.blob();
      const filename = fileName;

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  useEffect(() => {
    // confirm("Do not share this URL in public if the files contains private info")
    fetchTransferData();
  }, []);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse items-center justify-between w-4/5">
        <img
          src="https://images.pexels.com/photos/4792286/pexels-photo-4792286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="max-w-sm rounded-lg select-none shadow-2xl"
        />

        {isExpired ? (
          <h1 className="text-5xl mt-10 font-bold">Link has been expired!</h1>
        ) : (
          <div>
            <h1 className="text-5xl font-bold">Download your Files!</h1>

            <button onClick={handleClick} className="btn btn-outline btn-accent my-5">
              Copy the Download Link
            </button>

            <div className="my-5">
              {files.map((file) => {
                return (
                  <div
                    key={file._id}
                    className="rounded border py-4 w-full flex items-center justify-evenly"
                  >
                    <div className="">{file.filename}</div>
                    <button
                      onClick={() => {
                        handleDownload(file.fileId, file.filename);
                      }}
                      className="btn btn-primary"
                    >
                      Download
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Download;
