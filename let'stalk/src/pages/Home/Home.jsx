import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const auth = getAuth();
  const navigate= useNavigate()
 const data= useSelector(state=>state.userLoginInfo.userInfo);
 const [verify, setVerify]=useState(false)

 useEffect(()=>{
  if(!data){
    navigate('/login')
  }
 },[])
 onAuthStateChanged(auth, (user) => {
  if(user.emailVerified){
    setVerify(true)
  }
});

  return (
    <div>
      {
        verify?
        <h1>home</h1>
        :
        <div className='h-screen w-full bg-primary flex justify-center items-center'>
          <div className='bg-white rounded p-10'>
           <h1 className='font-sans font-bold text-[34px] text-[#11175D]'>PLEASE VERIFY YOUR EMAIL</h1>
           <button className='font-nun font-semibold text-[20px] text-white bg-primary px-10 py-4 rounded ml-[100px] mt-[20px]'>
          <Link to='/login'>  BACK TO LOGIN </Link></button>
           </div>
        </div>
      }
    </div>
  )
}

export default Home 