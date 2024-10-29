import React, { FC, useEffect, useState } from "react";
import { styles } from "@/app/Style/style";
import {  useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";

type Props = {};

const ChangePassword: FC<Props> = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error("Passwords not matched");
    } else {
      await updatePassword({
        oldPassword,
        newPassword,
      });
    }
  };

  useEffect(()=>{
    if(isSuccess){
        toast.success("Password updated successfully")
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

  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
      <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center text-[500] text-black dark:text-[#fff] pb-2 ">
        Change Password
      </h1>
      <div className="w-full">
        <form
          onSubmit={passwordChangeHandler}
          aria-required
          className="flex flex-col items-center"
        >
          <div className="w-[100%] 800px:w-[60%] mt-5 ">
            <label className="block pb-2 text-black dark:text-[#fff]">
              Enter Your Old Password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-2 ">
            <label className="block pb-2 text-black dark:text-[#fff]">
              Enter Your New Password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-2 ">
            <label className="block pb-2 text-black dark:text-[#fff]">
              Enter Confirm Password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="submit"
              required
              value="Update"
              className={`w-[95%] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
