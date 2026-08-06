import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Link } from 'react-router-dom'


export default function Navbar() {
  return (
    <div className='bg-slate-900 text-white w-full flex justify-between px-20 py-5'>
        <div className='flex gap-5'>
            <Link className='hover:underline' to="/admin">Dashbord</Link>
            <Link className='hover:underline' to="/admin/users">Attuck Data</Link>
        </div>
        <div>
            <Show when="signed-out">
                <SignInButton>
                    <button className='px-3 py-2 bg-blue-700 rounded-md hover:bg-blue-500 transition'>Login</button>
                </SignInButton>
            </Show>
            <Show when="signed-in">
                <UserButton />
            </Show>
        </div>
    </div>
  )
}
