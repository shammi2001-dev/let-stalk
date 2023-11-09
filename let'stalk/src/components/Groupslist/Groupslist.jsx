import React from 'react'
import gone from '../../assets/gone.png'
import gtwo from '../../assets/gtwo.png'
import gthree from '../../assets/gthree.png'
import {BsThreeDotsVertical} from 'react-icons/bs'
const Groupslist = () => {
  return (
    <div className='ml-[40px]'>
    <div className='shadow shadow-box rounded-[20px] pb-[21px]'>
        <div className='flex justify-between pl-[20px] pt-[15px] pb-[10px]'>
           <h2 className='text-[20px] font-pops font-semibold text-[#000]'>Groups List</h2>
           <BsThreeDotsVertical className='text-[25px] text-primary mr-[10px]'></BsThreeDotsVertical>
        </div>
        <div className='ml-[20px] mt-[10px] flex items-center'>
        <img src={gone} alt=''></img>
          <div className='ml-[14px] '>
            <h3 className='text-[18px] font-pops font-semibold text-[#000]'>Friends Reunion</h3>
            <p className='text-[14px] font-pops font-semibold text-[#4D4D4D]'>Hi Guys, Wassup!</p>
          </div>
          <button className='bg-primary rounded pl-[22px] pr-[22px] pt-[5px] pb-[5px] ml-[20px] font-pops text-[20px] font-semibold text-white'>Join</button>
        </div>
        <div className='border-b w-[350px] mx-auto mt-[10px]'></div>


        <div className='ml-[20px] mt-[17px] flex items-center'>
        <img src={gtwo} alt=''></img>
          <div className='ml-[14px] '>
            <h3 className='text-[18px] font-pops font-semibold text-[#000]'>Friends Forever</h3>
            <p className='text-[14px] font-pops font-semibold text-[#4D4D4D]'>Good to see you.</p>
          </div>
          <button className='bg-primary rounded pl-[22px] pr-[22px] pt-[5px] pb-[5px] ml-[20px] font-pops text-[20px] font-semibold text-white'>Join</button>
        </div>
        <div className='border-b w-[350px] mx-auto mt-[10px]'></div>


        <div className='ml-[20px] mt-[17px] flex items-center'>
        <img src={gthree} alt=''></img>
          <div className='ml-[14px] '>
            <h3 className='text-[18px] font-pops font-semibold text-[#000]'>Crazy Cousins</h3>
            <p className='text-[14px] font-pops font-semibold text-[#4D4D4D]'>What plans today?</p>
          </div>
          <button className='bg-primary rounded pl-[22px] pr-[22px] pt-[5px] pb-[5px] ml-[20px] font-pops text-[20px] font-semibold text-white'>Join</button>
        </div>
    </div>
    </div>
  )
}

export default Groupslist