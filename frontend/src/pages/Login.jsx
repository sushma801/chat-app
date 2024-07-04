import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import useLogin from "../Hooks/useLogin";

const Login = () => {
  const { login } = useLogin();
  const initialValues = {
    userName: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(values);
      await login(values);
    },
  });
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-4 rounded-lg shadow-md  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-2xl font-semibold text-center text-gray-200">
          Login ChatApp
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label
              className="label p-2 text-base label-text"
              htmlFor="userName"
            >
              {" "}
              Username
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Enter Username"
              name="userName"
              id="userName"
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
          </div>
          <div>
            <label
              className="label p-2 text-base label-text"
              htmlFor="password"
            >
              {" "}
              Password
            </label>
            <input
              name="password"
              id="password"
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Enter Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-800 mt-2 inline-block p-2"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button type="submit" className="btn btn-block btn-sm mt-2">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
