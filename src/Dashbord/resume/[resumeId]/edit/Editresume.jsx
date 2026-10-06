import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../component/FormSection'
import ResumePreview from '../../component/ResumePreview'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import Dummy from '@/data/Dummy'
import GlobalApi from '../../../../../service/GlobalApi'

function Editresume() {
    const {resumeId }= useParams()
    const [resumeInfo,setResumeInfo]=useState()
    useEffect(()=>{
GetResumeInfo()
    },[])
    const GetResumeInfo=()=>{
      GlobalApi.GetResumeById(resumeId).then(resp=>{
        console.log(resp.data.data)
        setResumeInfo(resp.data.data)
      })
    }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
<FormSection/>
<ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default Editresume