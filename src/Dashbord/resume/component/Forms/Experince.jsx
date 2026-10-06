import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { toast } from '@/components/ui/toast'
import { toast } from "@/components/ui/toast"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../service/GlobalApi'
import RichTextEditor from '../RichTextEditor'


const formField = {
     title:'',
            companyname:'',
            city:'',
            state:'',
            startDate:'',
            endadate:'',
           worksummery:'',
}
function Experince() {
    const [expericelist,setexpericelist] =useState([])
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
const params =useParams()
const [loading,setloading]=useState(false)
useEffect(()=>{
    resumeInfo?.Experince?.length >0 && setexpericelist(resumeInfo?.Experince)
},[])






const handleChange = (index, event) => {
    // 1. Create a shallow copy of the array
    const newEntries = [...expericelist];
    
    // 2. Extract the name and value from the input field that triggered the change
    const { name, value } = event.target;
    
    // 3. Create a new object for the specific experience entry being edited to avoid direct mutation
    newEntries[index] = { 
        ...newEntries[index], 
        [name]: value 
    };
    
    // 4. Update the local state with the newly modified array (This is what was missing!)
    setexpericelist(newEntries);
  }

    // const handleChange=(index,event)=>{
    //     const newEntries =expericelist.slice()
    //     const {name,value} = event.target;
    //     newEntries[index][name]=value
    //     console.log(newEntries)
    //     setexpericelist(newEntries)
    // }
    const AddNewExperience=()=>{
setexpericelist([...expericelist,{
    title:'',
            companyname:'',
            city:'',
            state:'',
            startDate:'',
            endadate:'',
           worksummery:'',
}])
    }
    const RemoveExperience =()=>{
setexpericelist(expericelist=>expericelist.slice(0,-1))
    }

const handleRichTextEditore = (e, name, index) => {
  const newEntries = [...expericelist];
  newEntries[index] = {
    ...newEntries[index],
    [name]: e.target.value
  };
  setexpericelist(newEntries);
}




// const handleRichTextEditore =(e,name,index)=>{
// const newEntries= expericelist.slice()
// newEntries[index][name]=e.target.value
// setexpericelist(newEntries)
// }
useEffect(()=>{
    setResumeInfo({
        ...resumeInfo,
        experince:expericelist
    })
},[expericelist])

const onSave=()=>{
    setloading(true)
    const data={
        data:{
            experince:expericelist.map(({id,...rest})=>rest)
        }
    }
    console.log(expericelist)
GlobalApi.UpdateResumeDetailed(params?.resumeId,data).then(res=>{
            console.log(res);
            setloading(false);

            toast.add({
                title:"Detailed Updated"
            })
        },(error)=>{
            setloading(false);
        })
}


  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
            {expericelist.map((item,index)=>(
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input name="title" 
                            onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.title}
                            />
                        </div>
                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input name="companyname" 
                            onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.companyname} />
                        </div>
                        <div>
                            <label className='text-xs'>City</label>
                            <Input name="city" 
                            onChange={(event)=>handleChange(index,event)} 
                            defaultValue={item?.city}/>
                        </div>
                        <div>
                            <label className='text-xs'>State</label>
                            <Input name="state" 
                            onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.state}
                             />
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type="date"  
                            name="startDate" 
                            onChange={(event)=>handleChange(index,event)} 
                            defaultValue={item?.startDate}/>
                        </div>
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type="date" name="endadate" 
                            onChange={(event)=>handleChange(index,event)} 
                            defaultValue={item?.endadate}
                            />
                        </div>
                        <div className='col-span-2'>
                           {/* Work Summery  */}
                           <RichTextEditor
                           index={index}
                           defaultValue={item?.worksummery}
                           onRichTextEditorChange={(event)=>handleRichTextEditore(event,'worksummery',index)}  />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
            <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} className={`bg-violet-500`}
            onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
        </div>
    </div>
  )
}

export default Experince