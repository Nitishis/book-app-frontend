import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TfiTwitterAlt } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [message, setMessage] = useState("");
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await loginUser(data.email, data.password);
      alert("Login successfully!");
      navigate("/")
    } catch (error) {
      setMessage("Please provide a valid email and password");
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
        await signInWithGoogle();
        alert("Login successful!");
        navigate("/")
    } catch (error) {
        alert("Google sign in failed!") 
        console.error(error)
    }
  }

  return (
    <>
      <div className="flex justify-center pt-5">
        <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:text-gray-50 dark:bg-gray-800">
          <h2 className="mb-3 text-3xl font-semibold text-center">
            Login to your account
          </h2>
          <p className="text-sm text-center dark:text-slate-400 flex justify-center items-center gap-2 p-2">
            Don't have an account?
            <Link
              to="/register"
              rel="noopener noreferrer"
              className="focus:underline hover:underline font-semibold text-sm"
            >
              Sign up here
            </Link>
          </p>
          <div className="my-6 space-y-4">
            <button
              onClick={handleGoogleSignIn}
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
            >
              <FcGoogle className="size-6" />
              <p>Login with Google</p>
            </button>
            <button
              aria-label="Login with GitHub"
              role="button"
              className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
            >
              <FaGithub className="size-6" />
              <p>Login with GitHub</p>
            </button>
            <button
              aria-label="Login with Twitter"
              role="button"
              className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
            >
              <TfiTwitterAlt className="size-6" />
              <p>Login with Twitter</p>
            </button>
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full dark:text-gray-600" />
            <p className="px-3 dark:text-slate-400">OR</p>
            <hr className="w-full dark:text-gray-600" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            action=""
            className="space-y-4"
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="email" className="block text-md">
                  Email address
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="leroy@jenkins.com"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-md">
                    Password
                  </label>
                </div>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs block text-right hover:underline dark:text-slate-400"
                  style={{ marginTop: "2px" }}
                >
                  Forgot password?
                </a>
              </div>
              {message && (
                <p className="text-red-500 text-xs italic mb-3 ">{message}</p>
              )}
            </div>
            <button className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
