"use client";

import React, { FC, useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { useRouter } from "next/router";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  SettingsIcon,
} from "./Icon";
import avatarDefault from "../../../Images/avatar.jpeg";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
}

const Item: FC<itemProps> = ({ title, to, icon, selected }) => {
  return (
    <MenuItem active={selected === to} icon={icon}>
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const menuItems = [
    { title: "Dashboard", to: "/admin", icon: <HomeOutlinedIcon /> },
    { title: "Users", to: "/admin/users", icon: <GroupsIcon /> },
    { title: "Invoices", to: "/admin/invoices", icon: <ReceiptOutlinedIcon /> },
    { title: "Create Course", to: "/admin/create-course", icon: <VideoCallIcon /> },
    { title: "Live Courses", to: "/admin/courses", icon: <OndemandVideoIcon /> },
    { title: "Hero", to: "/admin/hero", icon: <WebIcon /> },
    { title: "FAQ", to: "/admin/faq", icon: <QuizIcon /> },
    { title: "Categories", to: "/admin/categories", icon: <WysiwygIcon /> },
    { title: "Manage Team", to: "/admin/team", icon: <PeopleOutlinedIcon /> },
    { title: "Course Analytics", to: "/admin/course-analytics", icon: <BarChartOutlinedIcon /> },
    { title: "Orders Analytics", to: "/admin/orders-analytics", icon: <MapOutlinedIcon /> },
    { title: "Users Analytics", to: "/admin/users-analytics", icon: <ManageHistoryIcon /> },
    { title: "Settings", to: "/admin/settings", icon: <SettingsIcon /> },
  ];

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${theme === "dark" ? "#111C43 !important" : "#fff !important"}`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
      className="!bg-white dark:bg-[#111C43]"
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Link href="/">
                  <Typography variant="h6" className="uppercase">
                    ELearning
                  </Typography>
                </Link>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <ArrowBackIosIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="user-profile"
                  width={100}
                  height={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h4">{user?.name}</Typography>
                <Typography variant="h6">- {user?.role}</Typography>
              </Box>
            </Box>
          )}

          {menuItems.map((item) => (
            <Item
              key={item.to}
              title={item.title}
              to={item.to}
              icon={item.icon}
              selected={router.pathname}
            />
          ))}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
