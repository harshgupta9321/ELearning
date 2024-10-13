"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../Style/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from 'react-hot-toast'
import {signIn} from 'next-auth/react'

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open:boolean)=> void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email")
    .required("Please Enter Your Email"),
  password: Yup.string().required("Please Enter Your Password").min(6),
});

const Login: FC<Props> = ({ setRoute ,setOpen}) => {
  const [show, setShow] = useState(false);
  const [Login,{isSuccess,error}]=useLoginMutation()

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
     await Login({email,password})
    },
  });

useEffect(()=>{
  if(isSuccess){
    toast.success("Login successfully")
    setOpen(false)
  }

  if(error){
    const errorMessage = extractErrorMessage(error);
    toast.error(errorMessage);
  }
},[isSuccess,error])

const extractErrorMessage = (error: any) => {
  if (error && error.data) {
      if (typeof error.data === 'string') {
          // Extract the error message directly
          const regex = /Error:.*?(?=<br|$)/;
          const match = regex.exec(error.data);
          if (match) {
              return match[0].trim();
          }
      } else {
          return error.data?.message || "An unknown error occurred";
      }
  }
  return "An unknown error occurred";
};


  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title} `}>Login with ELearning</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className={`${styles.label} `}>
          Enter Your Email
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="loginmail@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          } `}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}

        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="email" className={`${styles.label} `}>
            Enter Your Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input} `}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}

         
        </div>

        {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
          
        <div className="w-full mt-5">
          <input type="submit" value="Login" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center font-Poppins pt-4 text-[14px] text-black dark:text-white">
          Or Join With
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2"
            onClick={()=> signIn("google")}
          />
          <AiFillGithub size={30} className="cursor-pointer ml-2 text-black dark:text-white"
            onClick={()=> signIn("github")}
          />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Not have any account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer  "
            onClick={() => setRoute("Sign-Up")}
          >
            Sign up
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login;
