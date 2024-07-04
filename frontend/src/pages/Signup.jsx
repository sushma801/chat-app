import { useFormik } from "formik";
import React from "react";

const genders = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
];

const Signup = () => {
  const initialValues = {
    username: "",
    fullname: "",
    gender: "Male",
    password: "",
    cnfPassword: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
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
              htmlFor="username"
            >
              {" "}
              Username
            </label>
            <input
              autoComplete="username"
              type="text"
              name="username"
              id="username"
              className="w-full input input-bordered h-10"
              placeholder="Enter Username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </div>
          <div>
            <label
              className="label p-2 text-base label-text"
              htmlFor="fullname"
            >
              {" "}
              Full-Name
            </label>
            <input
              autoComplete="full-name"
              type="text"
              name="fullname"
              id="fullname"
              className="w-full input input-bordered h-10"
              placeholder="Enter Full name"
              onChange={formik.handleChange}
              value={formik.values.fullname}
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
                      value={formik.values.genders}
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
              htmlFor="cnfPassword"
            >
              {" "}
              Confirm Password
            </label>
            <input
              autoComplete="off"
              name="cnfPassword"
              id="cnfPassword"
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Enter Confirm Password"
              onChange={formik.handleChange}
              value={formik.values.cnfPassword}
            />
          </div>
          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-800 mt-2 inline-block p-2"
          >
            Already have an account?
          </a>

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
