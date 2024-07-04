import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import useSignup from "../Hooks/useSignup";
import * as yup from "yup";

const genders = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
];

const Signup = () => {
  const { loading, signup } = useSignup();
  const validationSchema = yup.object({
    userName: yup
      .string()
      .required("Required username")
      .min(3, "Too! short username")
      .max(30, "Too! long username"),
    fullName: yup
      .string()
      .required("Required")
      .min(2, "Too! short full name")
      .max(30, "Too! long full name"),
    gender: yup.string().required("Required genders"),
    password: yup
      .string()
      .required("Required Password")
      .min(6, "Password is too short")
      .max(30, "Password is too long")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });
  const initialValues = {
    userName: "",
    fullName: "",
    gender: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
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
            {formik.touched.userName && formik.errors.userName ? (
              <div>
                <span className="text-red-800 font-semibold p-2">
                  {formik.errors.userName}
                </span>
              </div>
            ) : null}
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
            {formik.touched.fullName && formik.errors.fullName ? (
              <div>
                <span className="text-red-800 font-semibold p-2">
                  {formik.errors.fullName}
                </span>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col ">
            <div className="flex  p-2">
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
                        id={`gender ${gender.value}`}
                        className="radio border-slate-800"
                        onChange={formik.handleChange}
                        value={gender.value}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
            {formik.touched.gender && formik.errors.gender ? (
              <div>
                <span className="text-red-800 font-semibold p-2">
                  {formik.errors.gender}
                </span>
              </div>
            ) : null}
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
            {formik.touched.password && formik.errors.password ? (
              <div>
                <span className="text-red-800 font-semibold p-2">
                  {formik.errors.password}
                </span>
              </div>
            ) : null}
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
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div>
                <span className="text-red-800 font-semibold p-2">
                  {formik.errors.confirmPassword}
                </span>
              </div>
            ) : null}
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
