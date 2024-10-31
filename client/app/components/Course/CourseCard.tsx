import Link from 'next/link';
import Image from 'next/image';
import React, { FC } from 'react';
import Ratings from '@/app/utils/Ratings';
import { AiOutlineUnorderedList } from 'react-icons/ai';

type Props = {
    item: any;
    isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link href={!isProfile ? `course/${item._id}` : `course-access/${item._id}`}>
      <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
        
        {/* Thumbnail with fixed dimensions */}
        <div className="w-full h-[200px] overflow-hidden rounded">
          <Image
            src={item.thumbnail.url}
            width={300}   // Fixed width for uniformity
            height={200}  // Fixed height for uniformity
            objectFit="cover"
            className="w-full h-full"
            alt="Course Thumbnail"
          />
        </div>
        
        <br />
        <div className="flex-grow">
          <h1 className="font-Poppins text-[14px] text-black dark:text-[#fff] truncate mb-1">
            {item.name}
          </h1>
          
          <div className="w-full flex items-center justify-between mb-1"> {/* Reduced margin */}
            <Ratings rating={item.ratings} />
            <h5 className={`text-black dark:text-[#fff] text-sm ${isProfile && "hidden 800px:inline"}`}>
              {item.purchased} Students
            </h5>
          </div>
        </div>
        
        <div className='mt-5'>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className="text-black dark:text-[#fff]">
              {item.price === 0 ? 'Free' : `${item.price}$`}
            </h3>
            <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-[#fff] ">
              {item.estimatedPrice}
            </h5>
          </div>
          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList size={20} className="text-black dark:text-white" />
            <h3 className="pl-2 text-black dark:text-[#fff]">
              {item.courseData?.length} Lectures
            </h3>
          </div>
        </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
