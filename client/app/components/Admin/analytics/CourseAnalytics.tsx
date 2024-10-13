import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  LabelList,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/Style/style";
import toast from "react-hot-toast";

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, error, isLoading } = useGetCoursesAnalyticsQuery({});

  useEffect(()=>{
    if(error){
      toast.error("Some error in getting data from server")
      console.log(error)
    }
  },[data,error])

  // const analyticsData = [
  //   { name: "June 2023", uv: 3 },
  //   { name: "July 2023", uv: 2 },
  //   { name: "May 2023", uv: 5 },
  //   { name: "August 2023", uv: 7 },
  //   { name: "January 2023", uv: 3 },
  // ];
  // console.log(analyticsData)

  const analyticsData:any=[]
  
  data && data?.courses?.last12Months.forEach((item:any)=>(analyticsData.push({name:item.month,uv:item.count})))

  console.log(analyticsData)

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`${styles.title} px-5 !text-start`}>
              Courses Analytics
            </h1>
            <p className={`${styles.label} px-5`}>
              Last 12 months analytics data {" "}
            </p>
          </div>
          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position={"insideBottom"} />
                </XAxis>
                <YAxis domain={[minValue, (dataMax: number) => Math.ceil(dataMax * 1.2)]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
