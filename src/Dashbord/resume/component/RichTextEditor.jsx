import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useState } from 'react'
import { BtnBulletList, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar, } from 'react-simple-wysiwyg'
import { BtnLink } from 'react-simple-wysiwyg'
import { BtnBold,BtnItalic } from 'react-simple-wysiwyg'
import { Brain,LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from "@/components/ui/toast"
import { ai } from '../../../../service/Aimodal'
import { useContext } from 'react'

// const PROMPT = 'position title :{positionTitle}, Depends on positions title give me 5-7 bullet points'
const PROMPT = 'position title: {positionTitle}. Based on this position title, give me 5-7 bullet points in HTML format wrapped in <ul> and <li> tags. Do not include any conversational text, introductory sentences, or markdown formatting.';
function RichTextEditor({onRichTextEditorChange,index,defaultValue}) {
  const [value,setvalue]=useState(defaultValue)
  const {resumeInfo,setresumeInfo}=useContext(ResumeInfoContext)
  const [loading,setloading]=useState(false)
const GenerateSummeryFromAI=async()=>{
if(!resumeInfo?.experince[index]?.title){
  toast.add({
    title:"Please Add Title"
  })
  return;
}
setloading(true)
const prompt = PROMPT .replace('{positionTitle}',resumeInfo?.experince?.[index].title)
const result = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input:prompt
})
console.log(result.output_text);
const resp = result.output_text
setvalue(resp.replace('[',"").replace(']',""))
setloading(false)
}
  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summery</label>
        <Button variant="outline" size="sm" 
        onClick={GenerateSummeryFromAI}
        disabled={loading}
        className="flex gap-2 border-primary text-primary">
          {loading?
          <LoaderCircle className='animate-spin'/>:  
          <>
           <Brain className='h-4 w-4'/> Generate from AI 
           </>
        }
         </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(e)=>{
          setvalue(e.target.value)
          onRichTextEditorChange(e)
        }}>
<Toolbar>
  <BtnBold />
        <BtnItalic />
        <BtnUnderline/>
        <BtnStrikeThrough/>
        <Separator/>
        <BtnNumberedList/>
        <BtnBulletList/>
        <Separator/>
        <BtnLink/>
</Toolbar>

        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor