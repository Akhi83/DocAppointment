import React, { useState } from 'react'
import Login from '../Components/Login'

const LogIn = () => {


const [state,setState] = useState('Sign Up')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [name,setName] = useState('')
    

const onSubmitHandler = async (event) => {
    event.preventDefault()
}
  return (
   <form className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
            <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
            
            <div className='w-full'>
                <p>Full name</p>
                <input className='bg-transparent border border-zinc-100 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name} required />
            </div>
            <div className='w-full'>
                <p>Email</p>
                <input className='bg-transparent border border-zinc-100 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.email)} value={email} required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input className='bg-transparent border border-zinc-100 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.password)} value={password} required />
            </div>
            <button className='bg-purple-400 text-white w-full py-2 mt-3 rounded-md text-base hover:bg-purple-200 hover:text-black'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
            {state === 'Sign Up' ?<p> Already have an account? <span onClick={()=>setState('Login')} className='underline cursor-pointer text-blue-600 hover:text-white'>Login here</span></p>:<p>Create a new account? <span onClick={()=>setState('Sign Up')} className='underline cursor-pointer text-blue-600 hover:text-white'>Click here</span></p>}
        </div>
   </form>
  )
}

export default LogIn