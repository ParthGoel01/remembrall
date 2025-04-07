import NavLink from './nav-link';
import { Images } from 'lucide-react'
import {
    SignedOut,
    SignedIn,
    UserButton
  } from '@clerk/nextjs'

export default function  header(){
  return (
    <nav className='container flex items-center justify-between p-4 mx-auto top-0 z-99 sticky bg-white min-w-screen'>
        <div className='flex lg:flex-1'>
            <NavLink href='/' className='flex items-center gap-1 lg:gap-2 shrink-0'>
                <Images className='w-5 h-5 lg:w-8 lg:h-8 text-gray-900' /> 
                <span className='font-extrabold lg:text-xl text-gray-900'>Remembrall</span>
            </NavLink>
        </div> 
        <div>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <NavLink href='/sign-in'>Sign In</NavLink>
            </SignedOut>
        </div>
    </nav>
  )
}