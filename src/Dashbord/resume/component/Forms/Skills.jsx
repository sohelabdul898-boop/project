import React, { useEffect, useState,useContext } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
// import { toast } from '@/components/ui/toast'
import { toast } from "@/components/ui/toast"
import { useParams } from 'react-router-dom'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '../../../../../service/GlobalApi'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'



function Skills() {
    const [skillsList,setSkillsList]=useState([{
        name:"",
        rating:0
    }])
    const {resumeId}=useParams();
    const [Loading,setLoading]=useState(false)
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    useEffect(()=>{
        resumeInfo&&setSkillsList(resumeInfo?.skills)
    },[])
    const handelChange =(index,name,value)=>{
        const newEnteries =skillsList.slice()
        newEnteries[index][name]=value
        setSkillsList(newEnteries)
    }
    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name:"",
            rating:0
        }])
    }
    const RemoveSkills =()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1))
    }
    const onSave =()=>{
        setLoading(true);
        const data={
            data:{
                skills:skillsList.map(({id,...rest})=>rest)
            }
        }
        GlobalApi.UpdateResumeDetailed(resumeId,data)
        .then(resp=>{
            console.log(resp)
           setLoading(false);
           toast.add({
            title:"Detailed updated !"
           })
        },(error)=>{
            setLoading(false)
            toast({
                title:"Server Error ,Try again!"
            })
        })
    }
    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })
    },[skillsList])
  return (
   <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Skills</h2>
    <p>Add Your top professional key skills</p>

    <div>
        {skillsList.map((item,index)=>(
            <div className='flex justify-between mb-2 border rounded-lg p-3 '>
                <div>
                    <label className='text-xs'>Name</label>
                    <Input className="w-full"
                    defaultValue={item.name}
                    onChange={(e)=>handelChange(index,'name',e.target.value)} />
                </div>
                <Rating style={{ maxWidth: 120 }} value={item.rating} 
                onChange={(v)=>handelChange(index,'rating',v)}/>

            </div>
        ))}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
            <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={Loading} className={`bg-violet-500`} onClick={()=>onSave()}>
            {Loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
    </div>
  )
}
  

export default Skills