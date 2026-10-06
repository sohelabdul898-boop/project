import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React from 'react'
import EducationalPreview from './Preview/EducationalPreveiw'
import PersonalDetailPreview from './Preview/PersonalDetailPreview'
import ProfesionalExperincePrivew from './Preview/ProfesionalExperincePrivew'
import SkillPreview from './Preview/SkillPreview'
import SummryPriview from './Preview/SummryPriview'
import { useContext } from 'react'

function ResumePreview() {
    const {resumeInfo,setresumeInfo}=useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{
        borderColor:resumeInfo?.themeColor
    }}>

{/* Personal Detail  */}
            <PersonalDetailPreview resumeInfo={resumeInfo} />
        {/* Summery  */}
            <SummryPriview resumeInfo={resumeInfo} />
        {/* Professional Experience  */}
           {resumeInfo?.experince?.length>0 && <ProfesionalExperincePrivew resumeInfo={resumeInfo} />}
        {/* Educational  */}
        {resumeInfo?. education?.length>0 &&   <EducationalPreview resumeInfo={resumeInfo} />}
        {/* Skilss  */}
        {resumeInfo?.skills?.length>0 &&    <SkillPreview resumeInfo={resumeInfo}/>}
    </div>
  )
}

export default ResumePreview