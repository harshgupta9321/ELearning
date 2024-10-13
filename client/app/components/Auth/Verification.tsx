import { useActivationMutation } from "@/redux/features/auth/authApi";
import { styles } from "../../Style/style";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import {useSelector} from 'react-redux'

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const {token}=useSelector((state:any)=>state.auth)
  const [activation,{isSuccess,error}]=useActivationMutation()
  const [invalidError, setInvalidError] = useState<boolean>(false);

  useEffect(()=>{
    if(isSuccess){
      toast.success("Account activated successfully")
      setRoute("login")
    }

    if (error) {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage);
      setInvalidError(true)
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

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    const verificationNumber=Object.values(verifyNumber).join("")
    if(verificationNumber.length!==4){
      setInvalidError(true)
      return;
    }

    await activation({
      activation_token:token,
      activation_code:verificationNumber
    })
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Verify Your Account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center ">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className="m-auto flex items-center justify-around ">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
              invalidError
                ? "shake border-red-500"
                : "dark:border-white border-[#0000004a]"
            } `}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button className={`${styles.button}`} onClick={verificationHandler}>

            Verify OTP
        </button>
      </div>
      <br />
      <br />
      <h5 className="text-center font-Poppins pt-4 text-[14px] text-black dark:text-white">
        Go back to Sign in? <span className="text-[#2190ff] pl-1 cursor-pointer " onClick={()=>setRoute("Login")}> Sign in</span>

      </h5>
    </div>
  );
};

export default Verification;
