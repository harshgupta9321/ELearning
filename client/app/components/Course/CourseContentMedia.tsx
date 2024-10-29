import { styles } from "@/app/Style/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import avatar from "../../Images/th.jpeg";
import toast from "react-hot-toast";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/courseApi";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");

  const [activeReplyReviewId, setActiveReplyReviewId] = useState<string | null>(
    null
  );

  const handleReplyToggle = (reviewId: string) => {
    if (activeReplyReviewId === reviewId) {
      setActiveReplyReviewId(null); // Hide reply input if already active
    } else {
      setActiveReplyReviewId(reviewId); // Show reply input for the clicked review
    }
  };

  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );

  const course = courseData?.course;

  const [
    addNewQuestion,
    { isSuccess, isLoading: questionCreationLoading, error },
  ] = useAddNewQuestionMutation({});

  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation({});

  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation({});

  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation({});

  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      console.log({ question, courseId: id, contentId: data[activeVideo]._id });
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      questionId: questionId,
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };

  // const handleReviewReplySubmit = () => {
  //   if (!replyCreationLoading) {
  //     if (reply === "") {
  //       toast.error("Reply cannot be empty");
  //     } else {
  //       addReplyInReview({ comment: reply, courseId: id, reviewId });
  //     }
  //   }
  // };

  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading && reply !== "") {
      addReplyInReview({
        comment: reply,
        courseId: id,
        reviewId: activeReplyReviewId,
      });
    } else {
      toast.error("Reply cannot be empty");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully");
    }

    if (reviewSuccess) {
      setReview("");
      courseRefetch();
      toast.success("Review added successfully");
    }

    if (replySuccess) {
      setReply("");
      courseRefetch();
      toast.success("Reply added successfully");
    }

    if (error) {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage);
    }

    if (answerError) {
      const errorMessage = extractErrorMessage(answerError);
      toast.error(errorMessage);
    }

    if (reviewError) {
      const errorMessage = extractErrorMessage(reviewError);
      toast.error(errorMessage);
    }

    if (replyError) {
      const errorMessage = extractErrorMessage(replyError);
      toast.error(errorMessage);
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    replySuccess,
    replyError,
  ]);

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
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto dark:text-white text-black">
      <CoursePlayer
        title={data[activeVideo].title}
        videoUrl={data[activeVideo].videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          }  !w-[unset] !min-h-[40px] !py-[unset] p-5 ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>

        <div
          className={`${
            styles.button
          } !w-[unset] !min-h-[40px]  !py-[unset] p-5 ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] ">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner ">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index && "text-red-500"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 ">
          {data[activeVideo].description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5">
              <h2 className="800px:text-[20px] 800px:inline-block">
                {item.title && item.title + " :"}
              </h2>
              <a
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2 "
                href={item.url}
                target="_blank"
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : avatar}
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover"
              alt="avatar"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your question..."
              className="outline-none bg-transparent ml-3 border dark:border-[#ffffff57]  800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px]  text-[18px] mt-5  800px:mr-0 mr-2 ${
                questionCreationLoading && "cursor-no-drop"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] dark:bg-[#ffffff3b] bg-slate-300 "></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExists && (
              <>
                <div className="flex w-full">
                  <Image
                    src={user.avatar ? user.avatar.url : avatar}
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    alt="avatar"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] ">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="Write your comment..."
                      className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${
                      styles.button
                    } !w-[120px] !h-[40px]  text-[18px] mt-5 800px:mr-0 mr-2 ${
                      reviewCreationLoading && "cursor-no-drop"
                    }`}
                    onClick={
                      reviewCreationLoading ? () => {} : handleReviewSubmit
                    }
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="w-full h-[1px] dark:bg-[#ffffff3b] bg-slate-300"></div>
            <div className="w-full">
              {course?.reviews &&
                course.reviews.map((item: any) => (
                  <div key={item._id} className="w-full my-5">
                    <div className="w-full flex">
                      <Image
                        src={item.user.avatar ? item.user.avatar.url : avatar}
                        width={50}
                        height={50}
                        className="w-[50px] h-[50px] rounded-full object-cover"
                        alt="avatar"
                      />
                      <div className="ml-2">
                        <h1 className="text-[18px]">{item?.user.name}</h1>
                        <Ratings rating={item.rating} />
                        <p>{item.comment}</p>
                        <small className="dark:text-[#ffffff83] text-[#000000b8]">
                          {format(item?.createdAt)} •{" "}
                        </small>
                      </div>
                    </div>
                    {user.role === "admin" && (
                      <span
                        className={`${styles.label} !ml-14 cursor-pointer`}
                        onClick={() => {
                          handleReplyToggle(item._id);
                          
                        }}
                      >
                        {activeReplyReviewId !== item._id
                          ? item.commentReplies.length !== 0
                            ? "All Replies"
                            : "Add Reply"
                          : "Hide Replies"}
                      </span>
                    )}

                    {activeReplyReviewId === item._id && item.commentReplies.map((i: any, index: number) => (
                      <div
                        key={activeReplyReviewId}
                        className="w-full flex 800px:ml-16 my-5 dark:text-white text-black"
                      >
                        <div>
                          <Image
                            src={avatar}
                            width={40}
                            height={40}
                            className="w-[40px] h-[40px] rounded-full object-cover"
                            alt="avatar"
                          />
                        </div>
                        <div className="pl-2">
                          <div className="flex items-center">
                            <h5 className="text-[20px]">{i.user.name}</h5>
                            {i?.user.role === "admin" && (
                              <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                            )}
                          </div>
                          <p>{i?.comment}</p>
                          <small className="dark:text-[#ffffff83] text-[#000000b8] ">
                            {format(i?.createdAt)} •{" "}
                          </small>
                        </div>
                      </div>
                    ))}

                    {activeReplyReviewId === item._id && (
                      <div key={activeReplyReviewId} className="w-full flex relative">
                        <input
                          type="text"
                          placeholder="Enter your reply"
                          value={reply}
                          onChange={(e: any) => setReply(e.target.value)}
                          className="block 800px:mt-12 mt-2 !border-b border-[#000] dark:border-[#fff] p-[5px] outline-none w-[95%] bg-transparent ml-14"
                        />
                        <button
                          type="submit"
                          className="absolute right-0 bottom-1"
                          onClick={handleReviewReplySubmit}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: number) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  item,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={item.user.avatar ? item.user.avatar.url : avatar}
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover"
              alt="avatar"
            />
          </div>
          <div className="pl-3">
            <h5 className="text-[20px]">{item.user.name}</h5>
            <p>{item?.question}</p>
            <small className="dark:text-[#ffffff83] text-[#000000b8]">
              {format(item?.createdAt)} •{" "}
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 dark:text-[#ffffff83] text-[#000000b8] cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive), setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage size={20} className="cursor-pointer" />
          <span className="pl-1 mt-[-4px] cursor-pointer dark:text-[#ffffff83] text-[#000000b8] ">
            {item?.questionReplies?.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((i: any) => (
              <div className="w-full flex 800px:ml-16 my-5 dark:text-white text-black">
                <div>
                  <Image
                    src={i.user.avatar ? i.user.avatar.url : avatar}
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    alt="avatar"
                  />
                </div>
                <div className="pl-2">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{i.user.name}</h5>
                    {i?.user.role === "admin" && (
                      <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                    )}
                  </div>
                  <p>{i?.answer}</p>
                  <small className="dark:text-[#ffffff83] text-[#000000b8] ">
                    {format(i?.createdAt)} •{" "}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className={`block  800px:ml-12 mt-2  outline-none bg-transparent border-b dark:border-[#ffffff57] border-[#000000b8] p-[5px] w-[95%] ${
                    answer === "" ||
                    (answerCreationLoading && "cursor-not-allowed")
                  } `}
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerCreationLoading}
                >
                  Submit
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
