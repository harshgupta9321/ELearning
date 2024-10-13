'use client'
import React from 'react'
import Heading from '../../utils/Heading'
import AdminSidebar from '../../components/Admin/sidebar/AdminSidebar'
import AdminProtected from '../../hooks/adminProtected'
import DashboardHero from '../../components/Admin/DashboardHero'
import EditCategories from '../../components/Admin/Customization/EditCategories'


type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <AdminProtected>
        <Heading
        title="ELearning-Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming,Redux,MERN,Machine Learning"
        />
        <div className='flex h-[100vh]'>
            <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar/>
            </div>
            <div className="w-[85%]">
                <DashboardHero/>
                <EditCategories/>
            </div>
        </div>
        </AdminProtected>
    </div>
  )
}

export default page