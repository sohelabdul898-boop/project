import React from 'react'

function SummryPriview({resumeInfo}) {
  return (
    
    <p className='text-xs'>
        {resumeInfo?.summery}
    </p>
  )
}

export default SummryPriview