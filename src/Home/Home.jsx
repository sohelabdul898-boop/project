// import Header from '@/components/custom/Header'
// import { UserButton } from '@clerk/react'
// import React from 'react'

// function Home() {
//   return (
//     <div>
//       <Header/>
//       Hello, welcome to the home page!
//     </div>
//   )
// }

// export default Home


// import Header from '@/components/custom/Header'
// import { UserButton } from '@clerk/react'
// import React from 'react'

// function Home() {
//   return (
//     <div className="min-h-screen bg-slate-50 font-sans">
//       <Header />
      
//       {/* Hero Section */}
//       <main className="flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center sm:pt-32">
        
//         {/* Badge/Tagline */}
//         <div className="mb-8 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">
//           ✨ Powered by advanced AI
//         </div>

//         {/* Main Headline */}
//         <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
//           Optimize your resume to <br className="hidden sm:block" />
//           <span className="text-blue-600">beat the ATS algorithms.</span>
//         </h1>

//         {/* Subtitle */}
//         <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
//           Get instant, AI-driven feedback on your resume. Identify missing keywords, fix formatting errors, and highlight your achievements to land more interviews.
//         </p>

//         {/* Call to Action Buttons */}
//         {/* <div className="mt-10 flex items-center justify-center gap-x-6">
//           <button className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
//             Get Started for Free
//           </button>
//           <a href="#" className="text-sm font-semibold leading-6 text-slate-900 hover:text-blue-600 transition-colors">
//             View an example <span aria-hidden="true">→</span>
//           </a>
//         </div> */}
        
//       </main>
//     </div>
//   )
// }

// export default Home
import Header from '@/components/custom/Header'
import { UserButton } from '@clerk/react'
import React from 'react'
import { motion } from 'framer-motion'

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center sm:pt-32">

        {/* Badge/Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mb-8 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800"
        >
          ✨ Powered by advanced AI
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl"
        >
          Optimize your resume to <br className="hidden sm:block" />
          <span className="text-blue-600">beat the ATS algorithms.</span>
        </motion.h1>

        {/* Subheadline Paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-lg text-slate-600"
        >
          Get instant, AI-driven feedback on your resume. Identify missing keywords, fix formatting errors, and highlight your achievements to land more interviews.
        </motion.p>
        
      </main>
    </div>
  )
}

export default Home