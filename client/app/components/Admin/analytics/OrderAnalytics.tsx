import React, { FC } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  Tooltip
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/Style/style";

type Props = {
  isDashboard?: boolean;
};

// const analyticsData = [
//   { name: "Page A", count: 4500},
//   { name: "Page B", count: 4250},
//   { name: "Page C", count: 7450 },
//   { name: "Page D", count: 1000 },
//   { name: "Page E", count: 5420 },
// ];

const UserAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data,isLoading } = useGetOrdersAnalyticsQuery({}) as any;

  const analyticsData:any=[]
  
  data && data.orders.last12Months.forEach((item:any)=>(analyticsData.push({name:item.month,count:item.count})))


 
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            isDashboard
              ? "h-[30vh]"
              : "h-screen"
          }`}
        >
          <div className={`${isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20p]"
              } px-5 !text-start `}
            >
              Orders Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data{" "}
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              !isDashboard ? "h-[90%]" : "h-full"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={`${isDashboard ? "100%" : "90%"}`}
              height={`${isDashboard ? "100%" : "50%"}`}
            >
              <LineChart
              width={500}
              height={300}
                data={analyticsData}
                margin={{ top: 5, right: 30, left: 20, bottom:5 }}
              >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name" />
                  
                <YAxis />
                <Tooltip />
                {!isDashboard && <legend/> }
                <Line type="monotone" dataKey="count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
