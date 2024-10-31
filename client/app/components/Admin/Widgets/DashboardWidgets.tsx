import React, { FC, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserAnalytics from "../analytics/UserAnalytics";
import OrderAnalytics from "../analytics/OrderAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";
import Loader from "../../Loader/Loader";

type Props = {
  open?: boolean;
  value?: number;
};

interface UserAnalyticsData {
  users: {
    last12Months: Array<{ month: string; count: number }>; // Adjust the types according to the actual data
  };
}

interface OrderAnalyticsData {
  orders: {
    last12Months: Array<{ month: string; count: number }>;
  };
}

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [orderComparePercentage, setOrderComparePercentage] = useState<any>();
  const [userComparePercentage, setUserComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({}) as {
    data: UserAnalyticsData;
    isLoading: boolean;
  };
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({}) as {
      data: OrderAnalyticsData;
      isLoading: boolean;
    };

  console.log(data);

  useEffect(() => {
    if (!isLoading && !ordersLoading && data && ordersData) {
      const usersLastTwoMonths = data.users.last12Months.slice(-2);
      const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

      if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2) {
        const usersCurrentMonth = usersLastTwoMonths[1].count;
        const ordersCurrentMonth = ordersLastTwoMonths[1].count;

        const usersPrevMonth = usersLastTwoMonths[0].count;
        const ordersPrevMonth = ordersLastTwoMonths[0].count;

        const usersPercentChange =
          usersPrevMonth !== 0
            ? ((usersCurrentMonth - usersPrevMonth) / usersPrevMonth) * 100
            : 100;

        const ordersPercentChange =
          ordersPrevMonth !== 0
            ? ((ordersCurrentMonth - ordersPrevMonth) / ordersPrevMonth) * 100
            : 100;

        setUserComparePercentage({
          currentMonth: usersCurrentMonth,
          prevMonth: usersPrevMonth,
          percentChange: usersPercentChange,
        });

        setOrderComparePercentage({
          currentMonth: ordersCurrentMonth,
          prevMonth: ordersPrevMonth,
          percentChange: ordersPercentChange,
        });
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  return (
    <>
      {isLoading && ordersLoading ? (
        <Loader />
      ) : (
        <div className="mt-[30px] min-h-screen">
          <div className="grid grid-cols-[75%,25%]">
            <div className="p-8">
              <UserAnalytics isDashboard={true} />
            </div>
            <div className="pt-[80px] pr-8">
              <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
                <div className="flex items-center justify-between p-5">
                  <div className="">
                    <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                    <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                      {orderComparePercentage?.currentMonth}
                    </h5>
                    <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                      Sales Obtained
                    </h5>
                  </div>
                  <div>
                    <CircularProgressWithLabel
                      value={
                        orderComparePercentage?.percentChange > 0
                          ? orderComparePercentage?.percentChange.toFixed(2)
                          : 0
                      }
                      open={open}
                    />
                    <h5 className="text-center pt-4">
                      {orderComparePercentage?.percentChange > 0
                        ? "+" + orderComparePercentage?.percentChange.toFixed(2)
                        : "-" +
                          orderComparePercentage?.percentChange.toFixed(2)}
                      %
                    </h5>
                  </div>
                </div>
              </div>
              <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8">
                <div className="flex items-center p-5 justify-between">
                  <div className="">
                    <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                    <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                      {userComparePercentage?.currentMonth}
                    </h5>
                    <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                      New Users
                    </h5>
                  </div>
                  <div>
                    <CircularProgressWithLabel
                      value={
                        userComparePercentage?.percentChange > 0
                          ? userComparePercentage?.percentChange.toFixed(2)
                          : 0
                      }
                      open={open}
                    />
                    <h5 className="text-center pt-4">
                      {userComparePercentage?.percentChange > 0
                        ? "+" + userComparePercentage?.percentChange.toFixed(2)
                        : "-" + userComparePercentage?.percentChange.toFixed(2)}
                      %
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[65%,35%] mt-[-20px] ">
            <div className="dark:bg-[#111C43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto ">
              <OrderAnalytics isDashboard={true} />
            </div>
            <div>
              <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3">
                Recent Transactions
              </h5>
              <AllInvoices isDashboard={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardWidgets;
