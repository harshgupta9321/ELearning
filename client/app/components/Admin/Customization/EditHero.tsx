import { styles } from "@/app/Style/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isEditSuccess, setIsEditSuccess] = useState(false); // Local state for tracking success
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation(
    {}
  );

  useEffect(() => {
    if (data) {
      setTitle(data.layout.banner.title);
      setSubTitle(data.layout.banner.subTitle);
      setImage(data.layout.banner.image.url);
    }

    if (isSuccess && !isEditSuccess) {
      toast.success("Layout updated successfully");
      setIsEditSuccess(true); // Set the success state to true to prevent multiple toasts
      refetch();
    }

    if (error) {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage);
    }
  }, [data, isSuccess, error, isEditSuccess,refetch]);

  const extractErrorMessage = (error: any) => {
    if (error && error.data) {
      if (typeof error.data === "string") {
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

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      title,
      image,
      subTitle,
    });
    setIsEditSuccess(false); // Reset success state after triggering the edit
  };

  return (
    <>
      <div className="w-full 1000px:flex items-center">
        <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[500px] 1100px:w-[500px] h-[50vh]"></div>
        <div className="1000px:!w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10 ">
          <div className="relative flex items-center justify-end ">
            <img
              src={image}
              alt=""
              className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10] "
            />
            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />
            <label htmlFor="banner" className="absolute bottom-0 right-0 z-20 ">
              <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
            </label>
          </div>
        </div>
        <div className="1000px:!w-[60%] w-[100%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px] ">
          <textarea
            className="dark:text-white text-[#000000c7] resize-none text-[30px] px-3 w-[75%] 1000px:text-[60px] 1500px:text-[70px] font-[600] 1000px:leading-[75px] ml-[22%] bg-transparent "
            value={title}
            placeholder="Improve Your Online Learning Experience Better Instantly "
            onChange={(e) => setTitle(e.target.value)}
            rows={4}
          ></textarea>
          <br />
          <textarea
            className="dark:text-[#edfff4] text-[#000000ac] resize-none text-[18px] 1500px:!w-[55%] 1100px:!w-[78%] font-[600] font-Josefin bg-transparent"
            value={subTitle}
            placeholder=" We have 40K online courses & 500K+ Online Registered students. Find your desired courses from them."
            onChange={(e) => setSubTitle(e.target.value)}
            rows={4}
          ></textarea>
          <br />
          <br />
          <br />
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? "!cursor-pointer !bg-[#42d383]"
                : "!cursor-not-allowed"
            } !rounded absolute bottom-12 right-12`}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
