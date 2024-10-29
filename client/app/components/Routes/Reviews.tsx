import { styles } from "@/app/Style/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "John Doe",
    avatar: "https://via.placeholder.com/150/0000FF/FFFFFF?text=John",
    profession: "Software Engineer | New York",
    comment:
      "Great experience! The service was excellent and very professional.",
  },
  {
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Jane",
    profession: "Designer | Los Angeles",
    comment:
      "I loved working with them. They delivered beyond my expectations.",
  },
  {
    name: "Michael Brown",
    avatar: "https://via.placeholder.com/150/008000/FFFFFF?text=Michael",
    profession: "Marketing Manager | Chicago",
    comment:
      "Highly recommend! Their expertise made a significant impact on our project.",
  },
  {
    name: "Michael Brown",
    avatar: "https://via.placeholder.com/150/008000/FFFFFF?text=Michael",
    profession: "Marketing Manager | Chicago",
    comment:
      "Highly recommend! Their expertise made a significant impact on our project.",
  },
  {
    name: "Michael Brown",
    avatar: "https://via.placeholder.com/150/008000/FFFFFF?text=Michael",
    profession: "Marketing Manager | Chicago",
    comment:
      "Highly recommend! Their expertise made a significant impact on our project.",
  },
  {
    name: "Michael Brown",
    avatar: "https://via.placeholder.com/150/008000/FFFFFF?text=Michael",
    profession: "Marketing Manager | Chicago",
    comment:
      "Highly recommend! Their expertise made a significant impact on our project.",
  },
  // Other reviews can be added here
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../Images/4882404-removebg-preview.png")}
            alt="business"
            width={700}
            height={700}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are{" "}
            <span className="text-[#4141eb]">Our Strength</span>
            <br />
            See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repudiandae aspernatur incidunt quidem earum autem. Ut minus, sed
            impedit, dignissimos, doloremque nostrum consequatur laborum quae
            qui ipsa veniam nesciunt fugit aliquid!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-8 mb-12">
        {reviews.map((item: any, index: number) => (
          <ReviewCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
