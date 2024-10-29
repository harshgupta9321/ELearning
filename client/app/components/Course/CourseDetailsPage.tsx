import { useGetCourseDetailsQuery } from "@/redux/features/courses/courseApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from "@/redux/features/orders/ordersApi";
import {loadStripe} from '@stripe/stripe-js'

type Props = {
  id: string;
};

type StripeConfig = {
  publishableKey: string;
};



const CourseDetailsPage = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  
  // Explicitly type `config` as StripeConfig or undefined if it might be missing
  const { data: config } = useGetStripePublishableKeyQuery({}) as { data?: StripeConfig };

  const [createPaymentIntent,{data:paymentIntentData}]=useCreatePaymentIntentMutation() 
  
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState('');


  useEffect(() => {
    if (config) {
      const publishableKey = config.publishableKey;
      setStripePromise(loadStripe(publishableKey))
    }

    if(data){
      const amount=Math.round(data.course?.price*100)
      createPaymentIntent(amount)
    }

  }, [config,data]);


  useEffect(() => {
    if (paymentIntentData) {
      const clientSecret= paymentIntentData?.client_secret;
      if (clientSecret) {
        setClientSecret(clientSecret);
      } else {
        console.error("Client secret is not provided correctly.");
      }
    }
  }, [paymentIntentData]);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course?.name + "-ELearning"}
            description="It is a platform for students to learn at home."
            keywords={data?.course?.tags}
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            route={route}
            setRoute={setRoute}
          />
          {
            stripePromise && (
          <CourseDetails data={data?.course} stripePromise={stripePromise} clientSecret={clientSecret} 
          setOpen={setOpen}
          setRoute={setRoute}
          
          />

            )
          }
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
