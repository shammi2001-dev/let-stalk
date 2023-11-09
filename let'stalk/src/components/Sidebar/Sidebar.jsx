import React from 'react'
import profile from '../../assets/profile.png'
import {AiOutlineHome,AiFillMessage} from 'react-icons/ai'
import {FaRegBell} from 'react-icons/fa'
import {FiSettings} from 'react-icons/fi'
import {TbLogout} from 'react-icons/tb'
const Sidebar = () => {
  return (
    <div className='bg-primary h-screen rounded-lg pt-[38px]'>
        <img src={profile} alt=''className='mx-auto'></img>
        <div className='mt-[78px] relative py-[20px] after:absolute after:content-[""] after:bg-white after:top-0 after:left-[25px] after:w-full after:h-full after:z-[-1] z-[1] overflow-hidden after:rounded-l-lg 
        before:absolute before:content-[""] before:bg-primary before:top-0 before:right-0 before:w-[8px] before:h-full before:rounded-l-lg'>
          <AiOutlineHome className='text-5xl mx-auto text-primary'></AiOutlineHome>
        </div>
        <div className='mt-[57px]'>
        <AiFillMessage className='text-5xl mx-auto text-[#BAD1FF]'></AiFillMessage>
        </div>
        <div className='mt-[83px]'>
        <FaRegBell className='text-5xl mx-auto text-[#BAD1FF]'></FaRegBell>
        </div>
        <div className='mt-[83px]'>
        <FiSettings className='text-5xl mx-auto text-[#BAD1FF]'></FiSettings>
        </div>
        <div className='mt-[150px]'>
        <TbLogout className='text-5xl mx-auto text-[#BAD1FF]'></TbLogout>
        </div>
    </div>
  )
}

export default Sidebar