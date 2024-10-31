import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllCoursesQuery } from "@/redux/features/courses/courseApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { AiOutlineMail } from "react-icons/ai";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices: FC<Props> = ({ isDashboard }) => {
  const { theme, setTheme } = useTheme();
  const { data, isLoading } = useGetAllOrdersQuery({}) as any;
  const { data: usersData } = useGetAllUsersQuery({}) as any;
  const { data: coursesData } = useGetAllCoursesQuery({}) as any;

  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users?.find(
          (user: any) => user._id === item.userId
        );
        const course = coursesData?.courses?.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.3 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a
                  href={`mailto:${params.row.userEmail}`}
                  style={{
                    display: "flex",
                    justifyContent: "center", // Center horizontally
                    alignItems: "flex-end", // Align at the bottom (vertically)
                    width: "100%",
                    height: "100%", // Ensure full height to place it at the bottom
                    paddingBottom: "15px", // Optional: Add some padding if needed
                  }}
                >
                  <AiOutlineMail
                    className="dark:text-white text-black"
                    size={20}
                  />
                </a>
              );
            },
          },
        ]),
  ];

  const rows: any = [];

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt),
      });
    });

  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            overflow="hidden"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeadersInner": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC", // Additional selector for inner headers
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC", // Target specific column headers
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "1F2A40" : "F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderTop: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiCheckbox-root": {
                color: theme === "dark" ? "#fff !important" : "#000 !important", // Change checkbox color
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
