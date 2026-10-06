import React, { useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { Home, ArrowLeft, ArrowRight } from 'lucide-react'; // Injected missing icon imports
import ThemeColor from './ThemeColor';

// Make sure your form components are properly imported up here:
// import PersonalDetail from './Forms/PersonalDetail';
// import Summery from './Forms/Summery';
// import Experince from './Forms/Experince';
// import Education from './Forms/Education';
// import Skills from './Forms/Skills';

import Education from './Forms/Education';
import Experince from './Forms/Experince';
import PersonalDetail from './Forms/PersonalDetail';
import Skills from './Forms/Skills';
import Summery from './Forms/Summery';


import { Button } from '@/components/ui/button';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enabledNext, setEnableNext] = useState(false);
  const { resumeId } = useParams();

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to={"/dashboard"}>
            {/* Added width and height classes to constrain icon size */}
            <Button><Home className="w-5 h-5" /></Button>
          </Link>
          <ThemeColor />
        </div>

        <div className='flex gap-2'>
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              {/* Added width and height classes to constrain icon size */}
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}

          <Button
            disabled={!enabledNext}
            className="flex gap-2 bg-violet-500 hover:bg-violet-600 text-white"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight className="w-4 h-4 bg-violet-500" />
          </Button>
        </div>
      </div>

      {/* Form Components Rendering */}
      {/* (Consider renaming 'Experince' and 'Summery' in your files to correct the spelling) */}
      {activeFormIndex === 1 ? (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summery enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 3 ? (
        <Experince />
      ) : activeFormIndex === 4 ? (
        <Education />
      ) : activeFormIndex === 5 ? (
        <Skills />
      ) : activeFormIndex === 6 ? (
        <Navigate to={'/my-resume/' + resumeId + '/view'} />
      ) : null}
    </div>
  );
}

export default FormSection;