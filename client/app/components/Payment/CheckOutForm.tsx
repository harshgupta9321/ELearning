import React, { FC, useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { styles } from "@/app/Style/style";
import {
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  setOpen: any;
  data: any;
};

const CheckOutForm: FC<Props> = ({ setOpen, data }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(!stripe || !elements){
        return;
    }
    setIsLoading(true)
    const {error,paymentIntent}=await stripe.confirmPayment({
        elements,
        redirect:"if_required"
    })
    if(error){
        setMessage(error.message)
        setIsLoading(false)
    }else if(paymentIntent && paymentIntent.status==="succeeded"){
        setIsLoading(false)
        const courseId=data._id
        const payment_info=paymentIntent
        createOrder({courseId,payment_info})

    }
  };

  useEffect(()=>{
    if(orderData){
        setLoadUser(true)
        toast.success("Course Purchased successful")
        redirect(`/course-access/${data._id}`)
    }
    if(error){
        const errorMessage = extractErrorMessage(error);
        toast.error(errorMessage);
      }

  },[orderData,error])

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
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit"  className={`${styles.button} mt-12 !h-[65px] `}>
        <span id="button-text">
          {isLoading ? "Paying..." : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-[red] font-Poppins pt-2">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckOutForm;
