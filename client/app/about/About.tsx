import React from "react";
import { styles } from "../Style/style";

type Props = {};

const About = (props: Props) => {
  return (
    <div className=" dark:text-white text-black">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        About <span className="text-[#4141eb]">ELearning</span>
      </h1>
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-Poppins dark:text-white text-black ">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <p className="text-lg text-gray-600 dark:text-white ">
                Welcome to <strong>ELearning</strong>, your ultimate platform
                for online education designed to cater to the diverse needs of
                learners across the globe. Our goal is to provide an intuitive
                and engaging learning experience that empowers students and
                professionals alike to enhance their skills and knowledge in
                various domains.
              </p>
            </div>

            <section className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white  ">
                  Who We Are
                </h2>
                <p className="text-lg text-gray-600 dark:text-white ">
                  <strong>ELearning</strong> is a comprehensive Learning
                  Management System (LMS) designed to facilitate seamless
                  learning and content delivery. Built using cutting-edge
                  technologies like <strong>Next.js</strong>,{" "}
                  <strong>React</strong>, and <strong>TypeScript</strong>, the
                  platform offers an interactive and user-friendly interface for
                  both instructors and learners. With features that include
                  video content, quizzes, assignments, and real-time
                  discussions, ELearning ensures that every user has access to
                  top-tier educational resources.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white ">
                  What We Offer
                </h2>
                <ul className="list-disc list-inside text-lg text-gray-600 dark:text-white ">
                  <li>
                    <strong>Comprehensive Courses:</strong> Whether you're
                    learning a new skill or advancing your career, our diverse
                    range of courses covers topics in computer science,
                    artificial intelligence, machine learning, data science,
                    programming languages, and more.
                  </li>
                  <li>
                    <strong>Secure Video Hosting:</strong> We utilize{" "}
                    <strong>VdoCipher</strong> to ensure that all video content
                    is securely uploaded and accessible only to authorized
                    users, maintaining privacy and protection.
                  </li>
                  <li>
                    <strong>Engagement Tools:</strong> With interactive tools
                    such as quizzes, discussion forums, and real-time chat,
                    learners can stay engaged and motivated throughout their
                    educational journey.
                  </li>
                  <li>
                    <strong>Seamless Learning Experience:</strong> The platform
                    is designed to work across various devices, allowing you to
                    learn on-the-go and on your preferred device, without
                    compromising on the experience.
                  </li>
                </ul>
              </div>
            </section>

            <section className="bg-gray-50 dark:bg-slate-900 p-8 rounded-xl mb-12">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white  text-center mb-4">
                Why Choose ELearning?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white ">
                    Easy-to-use Interface
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-white ">
                    ELearning features a clean, responsive design that makes
                    navigation easy for everyone, regardless of technical
                    expertise.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white ">
                    Security
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-white ">
                    We use industry-standard services like{" "}
                    <strong>Cloudinary</strong> for secure image and media file
                    storage, ensuring that your data and content are always
                    safe.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white ">
                    Scalability
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-white ">
                    Whether you're an individual student, an instructor, or an
                    organization looking to scale, our platform can accommodate
                    learners of all sizes and needs.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white ">
                    Comprehensive Support
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-white ">
                    From course creation to student management, our support team
                    is here to assist you with any technical issues or
                    inquiries.
                  </p>
                </div>
              </div>
            </section>

            <div className="text-center">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white  mb-4">
                Join Us Today
              </h2>
              <p className="text-lg text-gray-600 dark:text-white ">
                Whether you're looking to acquire new skills, broaden your
                knowledge, or teach others, <strong>ELearning</strong> is here
                to support your learning journey. Explore our courses today and
                take the next step towards achieving your educational goals!
              </p>
            </div>
          </div>
        </p>
        <br />
        <span className="font-mono text-[22px]">HarshGupta-</span>
        <br />
        <h5 className="text-[18px] font-Poppins">
          Founder and CEO of ELearning
        </h5>
        <br />
      </div>
    </div>
  );
};

export default About;
