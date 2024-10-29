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
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please Enter Your Name!"),
  email: Yup.string()
    .email("Invalid Email")
    .required("Please Enter Your Email"),
  password: Yup.string().required("Please Enter Your Password").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register,{isError,data,error,isSuccess}]=useRegisterMutation()

  useEffect(()=>{
    if(isSuccess){
      const message=data?.message || "Registration successful"
      toast.success(message)
      setRoute("Verification")
    }

    if (isError) {
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




 

  const formik = useFormik({
    initialValues: {name:"", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({name, email, password }) => {
        const data={name,email,password}
        await register(data)
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title} `}>Join to ELearning</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label htmlFor="email" className={`${styles.label} `}>
          Enter Your Name
        </label>
        <input
          type="name"
          name=""
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="John Doe"
          className={`${errors.name && touched.name && "border-red-500"} ${
            styles.input
          } `}
        />
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}
        </div>


        <label htmlFor="email" className={`${styles.label} `}>
          Enter Your Email
        </label>
        <input
          type="email"
          name=""
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
          <input type="submit" value="Sign Up" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center font-Poppins pt-4 text-[14px] text-black dark:text-white">
          Or Join With
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2 text-black dark:text-white" />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Already have an account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer  "
            onClick={() => setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default SignUp;
