import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import useSignup from "../Hooks/useSignup";

const genders = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
];

const Signup = () => {
  const { loading, signup } = useSignup();
  const initialValues = {
    userName: "",
    fullName: "",
    gender: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(values);
      await signup(values);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-4 rounded-lg shadow-md  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-2xl font-semibold text-center text-gray-200">
          SignUp ChatApp
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
              autoComplete="username"
              type="text"
              name="userName"
              id="userName"
              className="w-full input input-bordered h-10"
              placeholder="Enter Username"
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
          </div>
          <div>
            <label
              className="label p-2 text-base label-text"
              htmlFor="fullName"
            >
              {" "}
              Full-Name
            </label>
            <input
              autoComplete="full-name"
              type="text"
              name="fullName"
              id="fullName"
              className="w-full input input-bordered h-10"
              placeholder="Enter Full name"
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
          </div>

          <div className="flex mt-2 ">
            {genders.map((gender) => {
              return (
                <div className="form-control" key={gender.value}>
                  <label
                    className="label gap-2 cursor-pointer"
                    htmlFor="gender"
                  >
                    <span className="label-text">{gender.label}</span>
                    <input
                      type="radio"
                      name="gender"
                      id="gender"
                      className="radio border-slate-800"
                      onChange={formik.handleChange}
                      value={gender.value}
                    />
                  </label>
                </div>
              );
            })}
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
              autoComplete="off"
              type="text"
              id="password"
              name="password"
              className="w-full input input-bordered h-10"
              placeholder="Enter Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div>
            <label
              className="label p-2 text-base label-text"
              htmlFor="confirmPassword"
            >
              {" "}
              Confirm Password
            </label>
            <input
              autoComplete="off"
              name="confirmPassword"
              id="confirmPassword"
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Enter Confirm Password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
          </div>
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-800 mt-2 inline-block p-2"
          >
            Already have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
