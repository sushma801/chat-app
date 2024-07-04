import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-4 rounded-lg shadow-md  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-2xl font-semibold text-center text-gray-200">
          Login ChatApp
        </h1>
        <form>
          <div>
            <label className="label p-2 text-base label-text"> Username</label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Enter Username"
            />
          </div>
          <div>
            <label className="label p-2 text-base label-text"> Password</label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Enter Password"
            />
          </div>
          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-800 mt-2 inline-block p-2"
          >
            {"Don't"} have an account?
          </a>

          <div>
            <button className="btn btn-block btn-sm mt-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
