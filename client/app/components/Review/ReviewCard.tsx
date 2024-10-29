import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import React, { FC } from "react";

type Props = {
  item: any;
};

const ReviewCard: FC<Props> = ({ item }) => {
  return (
    <div className="w-full h-max pb-4 dark:bg-slate-500 dark:bg-opacity-[0.20] border border-[#00000028] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner mb-8">
      <div className="flex w-full">
        <Image
          src={item.avatar}
          alt="avatar"
          width={50}
          height={50}
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <div className="800px:flex justify-between w-full hidden">
          <div className="pl-4">
            <h5 className="text-[20px] dark:text-white text-black">
              {item.name}
            </h5>
            <h6 className="text-[16px] dark:text-[#ffffffab] text-[#000]">
              {item.profession}
            </h6>
          </div>
          <Ratings rating={5} />
        </div>
        {/* for mobile */}
        <div className="800px:hidden justify-between w-full flex flex-col">
          <div className="pl-4">
            <h5 className="text-[20px] dark:text-white text-black">
              {item.name}
            </h5>
            <h6 className="text-[16px] dark:text-[#ffffffab] text-[#000]">
              {item.profession}
            </h6>
          </div>
          <Ratings rating={5} />
        </div>
      </div>
      <p className="pt-2 px-2 font-Poppins text-black dark:text-white">
        {item.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
