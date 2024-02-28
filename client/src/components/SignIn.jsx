import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { FaGoogle, FaGithub, FaFacebookSquare } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { login, signUpWithGoogle } = useContext(AuthContext);
  const { createUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //console.log(data);
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        //console.log(user);
        alert("Login Successful");
        navigate(from, { replace: true });

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleSignUp = () => {
    signUpWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        alert("Google SigUp Successfully");
        document.getElementById("login").close();
      })
      .catch((error) => {
        console.log(error);
      })
  }
  return (
    <div>
        <div className="max-w-md bg-white shadow-w-full mx-auto flex items-center justify-center my-20">
          <div className="modal-action mt-0 flex flex-col justify-center">
            <h3 className="font-bold text-lg">Please login!</h3>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  {...register("email")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  {...register("password")}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                < input
                  type='submit'
                  value="Login"
                  className="btn bg-red text-white" />
              </div>
              <p className='text-center my-2'>
                Don't have an account?{" "}
                <Link to={"/signUp"} className=" underline text-red ml-1" >
                  Sign Up Now
                </Link>
              </p>
              <button
                htmlFor={name}
                className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                onClick={() => document.getElementById(name).close()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6">
                  <path
                    fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75
                                     0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12
                                      13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </form>
            <div className='text-center space-x-3 mb-5'>
              <button className='btn btn-ghost btn-circle hover:bg-red hover:text-white'
                onClick={googleSignUp}>
                <FaGoogle />
              </button>
              <button className='btn btn-ghost btn-circle hover:bg-red hover:text-white'>
                <FaFacebookSquare />
              </button>
              <button className='btn btn-ghost btn-circle hover:bg-red hover:text-white'>
                <FaGithub />
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SignIn
