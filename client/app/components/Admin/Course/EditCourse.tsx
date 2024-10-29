"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useEditCourseMutation, useGetAllCoursesQuery } from "../../../../redux/features/courses/courseApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  
  const [editCourse,{isSuccess,error}]=useEditCourseMutation()

  const {  data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const editCourseData = data && data.courses.find((i: any) => i._id === id);


  const [active, setActive] = useState(0);


  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    categories:"",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength:"",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState({});

  console.log(courseData)

  useEffect(() => {
    if (editCourseData) { 
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        categories:editCourseData.categories,
        price: editCourseData.price,
        estimatedPrice: editCourseData?.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData.thumbnail?.url,
      });
      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);

  const handleSubmit = async () => {
    //format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));

    //format prequisites array
    const formattedPrequisites = prerequisites.map((prequisite) => ({
      title: prequisite.title,
    }));

    //format course content array
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        videoLength:courseContent.videoLength,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );

    // prepare data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories:courseInfo.categories,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrequisites,
      courseData: formattedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    await editCourse({id:editCourseData?._id,data})
  };

  console.log(editCourseData)
  

    useEffect(() => {
      if (isSuccess) {
        toast.success("Course updated successfully");
        redirect("/admin/courses");
      }

      if (error) {
        const errorMessage = extractErrorMessage(error);
        toast.error(errorMessage);
      }
    }, [ isSuccess, error]);

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

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%] ">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            setPrerequisites={setPrerequisites}
            prerequisites={prerequisites}
            benefits={benefits}
            setBenefits={setBenefits}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            handleCourseCreate={handleCourseCreate}
            courseData={courseData}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0 ">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
