import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './Home/Home'
import Dashbord from './Dashbord/Dashbord'
import { ClerkProvider } from '@clerk/react'
import Editresume from './Dashbord/resume/[resumeId]/edit/Editresume'
import ViewResume from './my-resume/[resumeId]/view/ViewResume'
import SignInPage from './auth/sign-in'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const router = createBrowserRouter([
{
        path: "/",
        element: <Home />
      },
 {
    element: <App />,
    children: [
     
      {
        path: "/dashboard",
        element: <Dashbord />
      },
      {
        path:"/dashboard/resume/:resumeId/edit",
        element:<Editresume/>
      }
    ]
  },
  
  {
    path: '/auth/sign-in',
    element: <SignInPage />
  },
  {
    path:"/my-resume/:resumeId/view",
    element:<ViewResume/>
  }

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
