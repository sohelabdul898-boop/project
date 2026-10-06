import React, { useEffect, useState } from 'react'
import AddResume from './Components/AddResume'
import GlobalApi from '../../service/GlobalApi'
import { useUser } from '@clerk/react'
import ResumeItem from './Components/ResumecardItem'

function Dashbord() {
  const {user}=useUser()
  const [resumeList,setResumeList]=useState([])
  
  useEffect(()=>{
user&&getresumeList()
  },[user])
  const getresumeList =()=>{
    GlobalApi.GetUserResume(user?.primaryEmailAddress?.emailAddress)
    .then(resp=>{
      setResumeList(resp.data.data)
    })
  }
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>
        My Resume
      </h2>
      <p>Start Creating AI resume to your next Job role</p>
      <div className='grid grid-cols-2 
      md:grid-cols-3 lg:grid-cols-5 gap-5
      mt-10'>
<AddResume/>
{resumeList.length>0?resumeList.map((resume,index)=>(
          <ResumeItem resume={resume} key={index} refreshData={getresumeList} />
        )):
        [1,2,3,4].map((item,index)=>(
          <div className='h-[280px] rounded-lg bg-slate-200 animate-pulse'>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Dashbord