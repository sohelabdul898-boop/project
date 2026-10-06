import React, { useContext, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { LoaderCircle } from 'lucide-react'
import { toast } from "@/components/ui/toast"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'

function Education() {
    const [loading, setLoading] = useState(false)
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const params = useParams()
    const [educationalList, seteducationalList] = useState([
        {
           universityname: "",
            degree: "",
            major: "",
            startDate: "",
            EndDate: "",
           description: "",
        }
    ])
    useEffect(() => {
        resumeInfo && seteducationalList(resumeInfo?.education)
    }, [])
    const handelChange = (event, index) => {
        const newenteries = educationalList.slice()
        const { name, value } = event.target;
        newenteries[index][name] = value
        seteducationalList(newenteries)
    }
    const AddNewEducation = () => {
        seteducationalList([...educationalList,
             {
         universityname: "",
            degree: "",
            major: "",
            startDate: "",
            EndDate: "",
           description: "",
        }
        ])
    }
    const RemoveEducation = () => {
        seteducationalList(educationalList => educationalList.slice(0, -1))
    }
    const onSave = () => {
        setLoading(true)
        const data = {
            data:{
                education: educationalList.map(({ id, ...rest }) => rest)
            }
        }
    
    GlobalApi.UpdateResumeDetailed(params.resumeId, data).then(resp => {
        console.log(resp);
        setLoading(false)
        toast.add({
          title:"Details updated !"
        })
    }, (error) => {
        setLoading(false);
        toast.add({
          title:"Server issue Try Again"
        })
    })
       }
    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            education:educationalList
        })
    },[educationalList])
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Education</h2>
    <p>Add Your educational details</p>

    <div>
      {educationalList.map((item,index)=>(
        <div>
          <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
            <div className='col-span-2'>
              <label>University Name</label>
              <Input name="universityname" 
              onChange={(e)=>handelChange(e,index)}
              defaultValue={item?.universityname}
              />
            </div>
            <div>
              <label>Degree</label>
              <Input name="degree" 
              onChange={(e)=>handelChange(e,index)}
              defaultValue={item?.degree} />
            </div>
            <div>
              <label>Major</label>
              <Input name="major" 
              onChange={(e)=>handelChange(e,index)}
              defaultValue={item?.major} />
            </div>
            <div>
              <label>Start Date</label>
              <Input type="date" name="startDate" 
              onChange={(e)=>handelChange(e,index)}
              defaultValue={item?.startDate} />
            </div>
            <div>
              <label>End Date</label>
              <Input type="date" name="EndDate" 
              onChange={(e)=>handelChange(e,index)}
              defaultValue={item?.EndDate} />
            </div>
            <div className='col-span-2'>
              <label>Description</label>
              <Textarea name="description" 
              onChange={(e)=>handelChange(e,index)}
              defaultValue={item?.description} />
            </div>

          </div>
       
        </div>
      ))}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
            <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} className={`bg-violet-500`}
             onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
    </div>
  )
}
    
export default Education