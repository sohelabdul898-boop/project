import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle } from 'lucide-react';
import {  useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import {toast} from "@/components/ui/toast"
function PersonalDetail({ enabledNext }) {
    const params = useParams()
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [formData, SetFormData] = useState()
    const [loading, setloading] = useState(false)
  
    useEffect(() => {
        console.log([params])
    },[])
    const handleInputChange = (e) => {
        enabledNext(false)
        const { name, value } = e.target;
        SetFormData({
            ...formData,
            [name]: value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }
// const onSave = (e) => {
//     e.preventDefault();
//     setloading(true);

//     // Destructure to remove Strapi's system fields, keeping only your form inputs
//     const { id, documentId, createdAt, updatedAt, publishedAt, ...cleanData } = formData;

//     const payload = {
//         data: cleanData
//     };

//     GlobalApi.UpdateResumeDetailed(params?.resumeId, payload).then(resp => {
//         console.log(resp);
//         enabledNext(true);
//         setloading(false);
//         toast("Details updated");
//     }, (error) => {
//         // This will print the exact Strapi error message directly to your console
//         console.error("Strapi Error:", error.response?.data?.error); 
//         setloading(false);
//     });
// }
    const onSave = (e) => {
        e.preventDefault()
        setloading(true)
        const data = {
           data:formData
        }
        GlobalApi.UpdateResumeDetailed(params?.resumeId,data)
        .then(resp => {
            console.log(resp);
            enabledNext(true);
            setloading(false);
            toast.add({
                title:"Details updated"
            })
        }, (error) => {
            setloading(false);
        })
    }
    return (
        <div className='p-5 shadow-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p>Get Started with the basic information</p>
            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input name="firstName"
                         defaultValue={resumeInfo?.firstName} 
                        required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name="LastName" required onChange={handleInputChange}
                            defaultValue={resumeInfo?.LastName} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name="jobTitle" required
                            defaultValue={resumeInfo?.jobTitle}
                            onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name="address" required
                            defaultValue={resumeInfo?.address}
                            onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input name="phone" required
                            defaultValue={resumeInfo?.phone}
                            onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input name="email" required
                            defaultValue={resumeInfo?.email}
                            onChange={handleInputChange} />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type="submit" className={`bg-violet-500`}
                        disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default PersonalDetail