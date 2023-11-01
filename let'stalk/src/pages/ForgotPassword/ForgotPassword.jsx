import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const ForgotPassword = () => {
    const auth = getAuth();
    const [email, setEmail]=useState('')

    const [emailerr, setEmailerr]=useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setEmailerr('')
    }
    const handleSign = () => {
        console.log('ok');
        if(!email){
            setEmailerr('PLEASE ENTER YOUR EMAIL FIRST')
        }else{
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                setEmailerr('INVALID EMAIL')
            }
        }
      if(email  && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log('send');
    setEmail('')
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
  });
        }
      }
  return (
    <div className='h-screen w-full bg-primary flex justify-center items-center'>
        <div className='bg-white w-1/2 rounded p-5 text-center'>
        <h1 className='font-sans font-bold text-[34px] text-[#11175D] '>Forgot Password</h1>
        <div className='relative mt-[60px]'>
            <input onChange={handleEmail} value={email} className='border-b border-[#808080] outline-none px-[52px] py-[26px]' type='email'></input>
            <p className='absolute left-[440px] top-0  font-nun font-semibold text-[13px] tracking-[1px]'>Email Address</p>
                
                <p className='text-red-500 font-bold'>{emailerr}</p>
            </div>
            <div className='flex justify-center gap-[20px]'>
            <div onClick={handleSign} className='mt-[64px] mb-[40px] cursor-pointer'>
            <button className='font-nun font-semibold text-[20px] text-white bg-primary px-[115px] py-[20px] rounded' href=''>Reset</button>
            </div>
            <div onClick={handleSign} className='mt-[64px] mb-[40px] cursor-pointer'>
            <button className='font-nun font-semibold text-[20px] text-white bg-primary px-[115px] py-[20px] rounded' href=''><Link to='/login'>Back To Login</Link></button>
            </div>
            </div>
        </div>
        </div>
  )
}

export default ForgotPassword