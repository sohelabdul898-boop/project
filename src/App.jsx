import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Navigate, Outlet } from 'react-router-dom'
import  {useUser}  from '@clerk/react'
import Header from './components/custom/Header'
// import { Toaster } from './components/ui/toast'
import { Toaster } from './components/ui/toast'

function App() {
  const [count, setCount] = useState(0)
  const {user,isSignIn,isLoaded}=useUser();

  if (isSignIn&&isLoaded) 
    {
    return<Navigate to={'/auth/sign-in'}/>
  }

  return (
    <>
    <Header />
     <Outlet/>
     <Toaster/>
    </>
  )
}

export default App
