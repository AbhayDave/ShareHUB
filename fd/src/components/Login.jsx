import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../api/authService";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../app/auth/authSlice";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      // console.log(data);
      const userData = await loginUser(data);
      
      if (userData) {
        dispatch(authLogin(userData));
        navigate("/");
      } 
      
    } catch (error) {

      setError("Invalid Credentials");
          setIsLoading(false);
    }
  };


  return (
    <div className="w-1/2 mx-auto my-10 max-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl">Login</h1>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form
        onSubmit={handleSubmit(login)}
        className="border p-10 rounded-2xl space-y-5 flex flex-col  items-center justify-center w-3/5 h-96 my-5"
      >
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
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </label>

        <label className="input w-full input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="grow"
            placeholder="Password"
          />
        </label>

        {isLoading ? (
          <span className="loading loading-infinity loading-lg">Loading</span>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-outline btn-info"
          >
            Login
          </button>
        )}

        <div>
          Don&apos;t have an account, {"  "}
          <Link to={"/register"} className="link link-warning">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
