import React from 'react'
import { Button } from '@/components/ui/button'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react'

// import { Toast } from '@base-ui/react';
import { toast } from "@/components/ui/toast"
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { ai } from "./../../../../../service/Aimodal"

function Summery({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [summery, setSummery] = useState()
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState()
    useEffect(() => {
        summery && setResumeInfo({
            ...resumeInfo,
            summery: summery
        })
    }, [summery])
    const GenerateSummeryFromAI = async () => {
        setLoading(true);

        const PROMPT = `Job Title: ${resumeInfo?.jobTitle}. Based on this job title, give me a list of professional resume summaries for 3 different experience levels: Fresher, Mid-Level, and Experienced. Return the response strictly as a JSON array containing objects with two keys: "experience_level" and "summary". Do not include any formatting or other text.`;

        try {
            const interaction = await ai.interactions.create({
                model: "gemini-3.8-flash", //
                input: PROMPT,
            });

            let aiText = interaction.output_text;


            aiText = aiText.replace('```json', '').replace('```', '');


            const parsedJsonList = JSON.parse(aiText);


            setAiGeneratedSummeryList(parsedJsonList);

        } catch (error) {
            console.error("AI Generation Error:", error);
        } finally {
            setLoading(false);
        }
    };


    const onSave = (e) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            data: {
                summery: summery
            }
        }
        GlobalApi.UpdateResumeDetailed(params?.resumeId, data).then(resp => {
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast.add({
                title: "Details updated"
            })
        }, (error) => {
            setLoading(false);
        })
    }
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summery</h2>
                <p>Add Summery for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summery</label>
                        <Button variant="outline" onClick={() => GenerateSummeryFromAI()}
                            type="button" size="sm" className="border-primary text-primary flex gap-2">
                            <Brain className='h-4 w-4' />  Generate from AI</Button>
                    </div>
                    <Textarea className="mt-5" required
                        value={summery}
                        defaultValue={summery ? summery : resumeInfo?.summery}
                        onChange={(e) => setSummery(e.target.value)}
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit" className={`bg-violet-500`}
                            disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>


            {aiGeneratedSummeryList && <div className='my-5'>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGeneratedSummeryList?.map((item, index) => (
                    <div key={index}
                        onClick={() => setSummery(item?.summary)}
                        className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                        <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                        <p>{item?.summary}</p>
                    </div>
                ))}
            </div>}

        </div>
    )
}

export default Summery