import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

type Props = {};

const Hero: FC<Props> = (props) => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search,setSearch]=useState("")
  const router=useRouter()

  const handleSearch=()=>{
    if(search===""){
      return
    }else{
      router.push(`/courses?title=${search}`)
    }
  }

  return (
    <>
      {
        isLoading ? (
          <Loader />
        ): (
          <div className="w-full min-h-[100vh] flex flex-col 1000px:flex-row items-center justify-between relative">
        <div className="xl:w-1/2  flex items-center justify-center h-full 800px:w-[50%] w-full">
          <Image
            src={data?.layout?.banner?.image?.url}
            width={600}
            height={600}
            alt=""
            className="object-contain w-1/2 xl:w-3/4 max-w-full h-auto rounded-[50%]"
          />
        </div>

        <div className="w-full xl:w-1/2 flex h-full flex-col items-center justify-center  1000px:text-left mt-[150px]   1000px:mt-0  mb-[10%] gap-12">
          <h2 className="dark:text-white  text-[#000000c7] ml-12 w-3/4 text-[8vw] xl:text-[4vw] font-[600] font-Josefin py-2 1000px:leading-[75px] ">
            {data?.layout?.banner?.title}
          </h2>

          <p className="dark:text-[#edfff4] text-[#000000ac] ml-12  text-[5vw] xl:text-[2vw] w-3/4 font-[600] font-Josefin">
            {data?.layout?.banner?.subTitle}
          </p>

          <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px]  bg-transparent relative">
            <input
              type="search"
              placeholder="Search Courses"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
            />
            <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]" onClick={handleSearch}>
              <BiSearch className="text-white" size={30} />
            </div>
          </div>

          <div className="1100px:w-[78%] 1500px:w-[55%] w-[90%] flex items-center ">
            <div className="flex items-center 1100px:w-[20%] 1500px:w-[15%] w-[20%]">
              <Image
                src={require("../../Images/3714960.jpg")}
                alt=""
                className="rounded-full"
              />
              <Image
                src={require("../../Images/3714960.jpg")}
                alt=""
                className="rounded-full ml-[-20px]"
              />
              <Image
                src={require("../../Images/3714960.jpg")}
                alt=""
                className="rounded-full ml-[-20px]"
              />
            </div>

            <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] ml-[20%] pl-3 text-[18px] font-[600]">
              500k+ people already trusted us.{" "}
              <Link
                href="/courses"
                className="dark:text-[#46e256] text-[crimson]"
              >
                View Courses
              </Link>
            </p>
          </div>
        </div>
      </div>
        )
      }
    </>
  );
};

export default Hero;
