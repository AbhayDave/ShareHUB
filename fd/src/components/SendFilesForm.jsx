import { useForm } from "react-hook-form";
import service from "../appwrite/appwrite";
import FileInput from "./FileInput";
import { useState } from "react";
import { APIService } from "../api/fileService";
import { useNavigate } from "react-router-dom";

function SendFilesForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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

      // (formData);

      const response = await APIService(data, "api/files/send", "POST");
      // console.log(response.data);
      if (response.data) {
        navigate(`/download/${response.data.uploadDocument._id}`);
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

      <label className="input w-full  input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          className="grow"
          placeholder="Your's Email"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
      </label>

      <label className="input w-full  input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          {...register("senderName", { required: "Sender name is required" })}
          type="text"
          className="grow"
          placeholder="Sender Name"
        />
        {errors.senderName && (
          <span className="text-red-500 text-xs">
            {errors.senderName.message}
          </span>
        )}
      </label>

      <label className="input w-full  input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          {...register("recipentemail", {
            required: `Recipent's Email is required`,
          })}
          type="email"
          className="grow"
          placeholder="Recipent's Email"
        />
        {errors.recipentemail && (
          <span className="text-red-500 text-xs">
            {errors.recipentemail.message}
          </span>
        )}
      </label>

      <input
        {...register("subject")}
        type="text"
        placeholder="Subject (optional)"
        className="input  input-bordered w-full "
      />
      {errors.subject && (
        <span className="text-red-500 text-xs">{errors.subject.message}</span>
      )}

      <textarea
        {...register("message")}
        className="textarea textarea-bordered w-full"
        placeholder="Your Message (optional)"
      ></textarea>
      {errors.message && (
        <span className="text-red-500 text-xs">{errors.message.message}</span>
      )}

      <FileInput register={register} setValue={setValue} />
      {errors.files && (
        <span className="text-red-500 text-xs">{errors.files.message}</span>
      )}

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

export default SendFilesForm;
