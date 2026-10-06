import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/react'

function Header({ className }) {
    const { user, isSignedIn } = useUser()
    return (
        <div className={`p-3 px-5 flex justify-between shadow-md ${className}`}>
            <img src="/logo.svg" width={100} height={100} />

            {
                isSignedIn ?
                    <div className='flex gap-2 items-center text-white'>
                        <Link to={'/dashboard'}>
                        <Button variant='outline' className={`bg-violet-500`}>
                            Dashboard
                        </Button>
                        </Link>
                        <UserButton />
                    </div> :
                    <Link to={'/auth/sign-in'}>
                        <Button className={`bg-violet-500`}>Get Started</Button>
                    </Link>
            }


        </div>
    )
}

export default Header