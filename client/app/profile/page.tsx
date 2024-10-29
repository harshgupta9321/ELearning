'use client'
import React,{FC,useState} from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Profile from '../components/Profile/Profile'
import {useSelector} from 'react-redux'

type Props = {}

const page:FC<Props> =(props) =>{
  const [open,setOpen]=useState(false);
  const [activeItem,setActiveItem]=useState(5);
  const [route,setRoute]=useState("Login");
  const {user} = useSelector((state:any)=>state.auth)

  return (
    <div>
      <Protected >
      <Heading
        title={`${user?.name} profile-ELearning`}
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
      <Profile user={user} />
      </Protected>
    </div>
  )
}

export default page