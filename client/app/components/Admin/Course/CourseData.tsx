import { styles } from "@/app/Style/style";
import React, { FC } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle'
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits)
  };

  const handleAddBenefit=()=>{
    setBenefits([...benefits,{title:""}])
  }

  const handlePrerequisiteChange=(index: number, value: any)=>{
    const updatedPrequisites = [...prerequisites];
    updatedPrequisites[index].title = value;
    setPrerequisites(updatedPrequisites)
  }

  const handleAddPrequisite=()=>{
    setPrerequisites([...prerequisites,{title:""}])
  }

  const prevButton=()=>{
    setActive(active-1)
  }

  const handleOptions=()=>{
    if(benefits[benefits.length-1]?.title!=='' && prerequisites[prerequisites.length-1]?.title!==''){
      setActive(active+1)
    }else{
      toast.error("Please fill the fields for go to next!")
    }
  }

  return (
    <div className="w-[80%] m-auto mt-24 block ">
      <div>
        <label htmlFor="email" className={`${styles.label} text-[20px]`}>
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benefit"
            placeholder="You will be able to build a full stack application"
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e: any) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
        style={{margin:"10px 0px" , cursor:"pointer", width:"30px"}}
        onClick={handleAddBenefit}
        />
      </div>

      <div>
        <label htmlFor="email" className={`${styles.label} text-[20px]`}>
          What are the prerequisites for students in this course?
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Prerequisites"
            placeholder="You need basic knowledge of MERN stack."
            required
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e: any) => handlePrerequisiteChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
        style={{margin:"10px 0px" , cursor:"pointer", width:"30px"}}
        onClick={handleAddPrequisite}
        />
      </div>
      <div className="w-full flex items-center justify-between">
          <div 
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer "
          onClick={()=>prevButton()}
          >
            Prev
          </div>
          <div 
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer "
          onClick={()=>handleOptions()}
          >
            Next
          </div>
        </div>
    </div>
  );
};

export default CourseData;
