import { useForm } from "react-hook-form";
import service from "../appwrite/appwrite";
import FileInput from "./FileInput";
import { useState } from "react";
import { APIService } from "../api/fileService";
import { useNavigate } from "react-router-dom";

function CreateLinkForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const uploadedFiles = []; // Array to store Appwrite responses

      // Single file handling
      if (data.files instanceof File) {
        const file = data.files;

        const response = await service.uploadFile(file);

        const fileObj = {
          name: response.name,
          id: response.$id,
          bucketId: response.bucketId,
          size: response.sizeOriginal,
        };

        uploadedFiles.push(fileObj);
      }

      // Multiple files handling
      else if (data.files instanceof Array) {
        for (const file of data.files) {
          const response = await service.uploadFile(file);

          const fileObj = {
            name: response.name,
            id: response.$id,
            bucketId: response.bucketId,
            size: response.sizeOriginal,
          };

          uploadedFiles.push(fileObj);
        }
      }

      const jsonData = JSON.stringify(uploadedFiles);

      data.files = jsonData;

      const response = await APIService(data, "api/files/create", "POST");
      if (response.data) {
        navigate(`/download/${response.data._id}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg flex flex-col items-center justify-center gap-5 mx-auto"
    >
      <label className="input w-full  input-bordered flex items-center gap-2">
        <input
          {...register("name", { required: "Transfer Name is required" })}
          type="text"
          className="grow"
          placeholder="Transfer Name"
        />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name.message}</span>
        )}
      </label>

      <FileInput register={register} setValue={setValue} />

      {isLoading ? (
        <span className="loading loading-infinity loading-lg">Loading</span>
      ) : (
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-outline btn-info"
        >
          Transfer
        </button>
      )}
    </form>
  );
}

export default CreateLinkForm;
