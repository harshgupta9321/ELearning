import React from "react";
import Link from "next/link";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="border border-[#0000000e] dark:border-[#ffffff1e] " />
      <br />
      <div className="w-[95%] 800px:!w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 md:px-8 ">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md-grid-cols-4 xl:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>          
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-4">
                <li>
                <Link
                  href="/courses"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/course-dashboard"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Course Dashboard
                </Link>
              </li>        
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Social Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://www.youtube.com/"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  YouTube
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/harshgupta9321"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.github.com/harshgupta9321"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Github
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Contact Info
            </h3>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              Call us: 000-000-00
            </p>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              Address: Hathras, Uttar Pradesh
            </p>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              Mail us: hello@gmail.com
            </p>
          </div>
        </div>
        <br />
        <p className="text-center text-black dark:text-white">Copyright © 2024 ELearning | All Rights Reserved</p>
      </div>
      <br />
    </footer>
  );
};

export default Footer;
