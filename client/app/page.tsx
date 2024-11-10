'use client'
import React,{FC,useEffect,useState} from "react"
import Heading from "./utils/Heading"
import Header from "./components/Header"
import Hero from "./components/Routes/Hero"
import Course from "./components/Routes/Course"
import Reviews from "./components/Routes/Reviews"
import FAQ from './components/FAQ/FAQ'
import Footer from './components/Footer'
import ChatbotWidget from "./components/ChatBotWidget"

interface Props{}

const Page: FC<Props> = (props)=>{
  const [open,setOpen]=useState(false);
  const [activeItem,setActiveItem]=useState(0);
  const [route,setRoute]=useState("Login");



  return (
    <div>
      <Heading 
        title="Elearning"
        description="It is a platform for student to learn at home."
        keywords="programming,MERN,full-stack"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />

      <Hero/>
      <ChatbotWidget />
      <Course />
      <Reviews/>
      <FAQ />
      <Footer/>

    </div>
  )
}

export default Page