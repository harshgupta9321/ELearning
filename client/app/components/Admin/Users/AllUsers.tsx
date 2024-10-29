import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../../redux/features/user/userApi";
import { styles } from "@/app/Style/style";
import toast from "react-hot-toast";

type Props = {
  isTeam?: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});
  const [active, setActive] = useState(false);
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [emailAdd,setEmailAdd]=useState([])

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };


  // const handleAddMember=()=>{
  //   const isEmailExist= 
  // }

  

  useEffect(() => {
    if (deleteSuccess) {
      setOpen(false);
      refetch();
      toast.success("User deleted successfully");
    }
    if (deleteError) {
      const errorMessage = extractErrorMessage(deleteError);
      toast.error(errorMessage);
    }
  }, [deleteSuccess, deleteError]);

  const extractErrorMessage = (error: any) => {
    if (error && error.data) {
      if (typeof error.data === "string") {
        // Extract the error message directly
        const regex = /Error:.*?(?=<br|$)/;
        const match = regex.exec(error.data);
        if (match) {
          return match[0].trim();
        }
      } else {
        return error.data?.message || "An unknown error occurred";
      }
    }
    return "An unknown error occurred";
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.3 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="text-black dark:text-white"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a
              href={`mailto:${params.row.email}`}
              style={{
                display: "flex",
                justifyContent: "center", // Center horizontally
                alignItems: "flex-end", // Align at the bottom (vertically)
                width: "100%",
                height: "100%", // Ensure full height to place it at the bottom
                paddingBottom: "15px", // Optional: Add some padding if needed
              }}
            >
              <AiOutlineMail className="text-black dark:text-white" size={20} />
            </a>
          </>
        );
      },
    },
  ];
  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {isTeam && (
            <div className="w-full flex justify-end">
              <div
                className={`${styles.button} !w-[200px] !h-[35px] dark:bg-[#57c7a3] dark:border dark:border-[#ffffff6c]`}
                onClick={() => setActive(!active)}
              >
                Add New Member
              </div>
            </div>
          )}

          {active && (
            <Box className="relative top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-100  w-[25vw] p-5 rounded-[5%]">
              <form action="">
              <label htmlFor="email" className={`${styles.label} opacity-100 bg-opacity-100 `}>
                Select Email
              </label>
            
              <select name="email" id="email" className={`${styles.input} dark:bg-black mb-5`}>
                <option value="">Select</option>
                {
                  data?.users?.map((user:any,index:number)=>(

                    <option value={user?.email}>{user?.email}</option>
                  ))
                }
              </select>
              
              <label htmlFor="role" className={`${styles.label} opacity-100 bg-opacity-100`}>
                Select Role
              </label>
              <select name="role" id="role" className={`${styles.input} dark:bg-black`}>
                <option value="">Select</option>
                <option value="admin">Admin</option>
                <option value="manager">User</option>
                <option value="user">User</option>
              </select>

              <button className={`${styles.button} mt-2 ` }>
                Add
              </button>
              </form>
              
            </Box>
          )}

          <Box
            m="40px 0 0 0"
            height="80vh"
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
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 ">
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this user?
                </h1>
                <div className="flex w-full items-center justify-between mb-6 ">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>

                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#f8492e]`}
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
