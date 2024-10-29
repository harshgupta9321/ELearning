import {
    useEditLayoutMutation,
    useGetHeroDataQuery,
  } from "@/redux/features/layout/layoutApi";
  import React, { useEffect, useState } from "react";
  import Loader from "../../Loader/Loader";
  import { styles } from "@/app/Style/style";
  import { AiOutlineDelete } from "react-icons/ai";
  import { IoMdAddCircleOutline } from "react-icons/io";
  import toast from "react-hot-toast";
  
  type Props = {};
  
  const EditCategories = (props: Props) => {
    const { data, isLoading, refetch, error } = useGetHeroDataQuery(
      "Categories",
      {
        refetchOnMountOrArgChange: true,
      }
    );
    const [editLayout, { isSuccess, error: editError }] = useEditLayoutMutation(
      {}
    );
    const [categories, setCategories] = useState<any[]>([]);
    const [successToastShown, setSuccessToastShown] = useState(false); // State to track success toast
  
    useEffect(() => {
      if (data) {
        setCategories(data.layout.categories);
      }
  
      if (isSuccess && !successToastShown) {
        setSuccessToastShown(true); // Ensure toast only shows once
        refetch();
        toast.success("Categories updated successfully");
      }
  
      if (error) {
        const errorMessage = extractErrorMessage(error);
        toast.error(errorMessage);
      }
    }, [data, isSuccess, error, successToastShown, refetch]);
  
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
  
    const handleCategoriesAdd = (id: any, value: string) => {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === id ? { ...category, title: value } : category
        )
      );
    };
  
    const newCategoriesHandler = () => {
      if (
        categories.length === 0 ||
        categories[categories.length - 1].title !== ""
      ) {
        setCategories((prevCategories) => [
          ...prevCategories,
          { _id: Date.now(), title: "" }, // Add unique ID for the new category
        ]);
      } else {
        toast.error("Category title cannot be empty");
      }
    };
  
    const areCategoriesUnchanged = (
      originalCategories: any[],
      newCategories: any[]
    ) => {
      return (
        JSON.stringify(originalCategories) === JSON.stringify(newCategories)
      );
    };
  
    const isAnyCategoryTitleEmpty = (categories: any[]) => {
      return categories.some((q) => q.title === "");
    };
  
    const editCategoriesHandler = async () => {
      if (
        !areCategoriesUnchanged(data?.layout?.categories, categories) &&
        !isAnyCategoryTitleEmpty(categories)
      ) {
        await editLayout({
          type: "Categories",
          categories,
        });
        setSuccessToastShown(false); // Reset toast flag after a successful update
      }
    };
  
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-[120px] text-center">
            <h1 className={`${styles.title}`}>All Categories</h1>
            {categories &&
              categories.map((item: any, index: number) => {
                return (
                  <div className="p-3" key={item._id}>
                    <div className="flex items-center w-full justify-center">
                      <input
                        className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                        value={item.title}
                        onChange={(e: any) =>
                          handleCategoriesAdd(item._id, e.target.value)
                        }
                        placeholder={"Enter category title... "}
                      />
                      <AiOutlineDelete
                        className="dark:text-white text-black text-[18px] cursor-pointer"
                        onClick={() => {
                          setCategories((prevCategories: any) =>
                            prevCategories.filter((i: any) => i._id !== item._id)
                          );
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            <br />
            <br />
            <div className="w-full flex justify-center">
              <IoMdAddCircleOutline
                className="dark:text-white text-black text-[18px] cursor-pointer"
                onClick={newCategoriesHandler}
              />
            </div>
            <div
              className={`${
                styles.button
              } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
                areCategoriesUnchanged(data?.layout?.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? "!cursor-not-allowed"
                  : "!cursor-pointer !bg-[#42d383]"
              } !rounded absolute bottom-12 right-12`}
              onClick={
                areCategoriesUnchanged(data?.layout?.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? () => null
                  : editCategoriesHandler
              }
            >
              Save
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default EditCategories;
  