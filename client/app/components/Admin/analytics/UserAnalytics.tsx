import React, { FC } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  AreaChart,
  Area,
  Tooltip
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/Style/style";

type Props = {
  isDashboard?: boolean;
};

// const analyticsData = [
//   { name: "June 2023", count: 450},
//   { name: "July 2023", count: 425 },
//   { name: "May 2023", count: 745 },
//   { name: "August 2023", count: 100 },
//   { name: "January 2023", count: 542 },
// ];

const UserAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, error, isLoading } = useGetUsersAnalyticsQuery({});

  const analyticsData:any=[]
  
  data && data?.users?.last12Months.forEach((item:any)=>(analyticsData.push({name:item.month,count:item.count})))



  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px]"
              : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20p]"
              } px-5 !text-start `}
            >
              Users Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data{" "}
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={`${isDashboard ? "100%" : "90%"}`}
              height={`${!isDashboard ? "50%" : "100%"}`}
            >
              <AreaChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  fill="#4d62d9"
                  stroke="#4d62d9"
                >
                </Area>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
