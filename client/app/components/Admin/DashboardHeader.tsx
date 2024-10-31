"use client";
import React, { FC, useEffect, useState } from "react";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>();
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/duiambqka/video/upload/v1730284324/notification-sound-2-253324_ldcqn4.mp3"
    )
  );


  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }

    if (isSuccess) {
      refetch();
    }
    audio.load();
    
  }, [data, isSuccess,audio,refetch]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playNotificationSound();
    });
  }, [data]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer text-black dark:text-white" />
        <span className="absolute -top-2 -right-2 rounded full bg-[#3ccba0] w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white ">
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] bg-white dark:bg-[#111C43] shadow-xl absolute top-16 z-10 rounded ">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3 ">
            Notifications
          </h5>
          {notifications &&
            notifications.map((item: any, index: number) => (
              <div key={index} className="dark:bg-[#2d3a4ea1] bg-[#00000013] border-b dark:border-b-[#ffffff47] border-b-[#0000000f] font-Poppins">
                <div className="w-full flex items-center justify-between p-2 ">
                  <p className="text-black dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-black dark:text-white cursor-pointer"
                  onClick={()=>handleNotificationStatusChange(item._id)}
                  >
                    Mark as Read
                  </p>
                </div>
                <p className="text-black dark:text-white px-2">
                  {item.message}
                </p>
                <p className="text-black dark:text-white p-2 text-[14px]">
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
