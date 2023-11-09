import React from 'react'
import fone from '../../assets/fone.png'
import ftwo from '../../assets/ftwo.png'
import fthree from '../../assets/fthree.png'
import ffour from '../../assets/ffour.png'
import {BsThreeDotsVertical} from 'react-icons/bs'
const Blocked = () => {
  return (
    <div className='ml-[20px] mt-[10px]'>
    <div className='shadow shadow-box rounded-[20px] pb-[21px] pt-[5px]'>
        <div className='flex justify-between pl-[20px] pt-[10px] pb-[10px]'>
           <h2 className='text-[20px] font-pops font-semibold text-[#000]'>Blocked Users</h2>
           <BsThreeDotsVertical className='text-[25px] text-primary mr-[10px]'></BsThreeDotsVertical>
        </div>
        <div className='ml-[20px] mt-[10px] flex items-center'>
        <img src={fone} alt=''></img>
          <div className='ml-[14px] '>
            <h3 className='text-[18px] font-pops font-semibold text-[#000]'>Raghav</h3>
            <p className='text-[14px] font-pops font-semibold text-[#4D4D4D]'>Dinner?</p>
          </div>
          <button className='bg-primary rounded pl-[10px] pr-[10px] pt-[5px] pb-[5px] ml-[105px] font-pops text-[20px] font-semibold text-white'>Unblock</button>
        </div>
        <div className='border-b w-[350px] mx-auto mt-[10px]'></div>


        <div className='ml-[20px] mt-[17px] flex items-center'>
        <img src={ftwo} alt=''></img>
          <div className='ml-[14px] '>
            <h3 className='text-[18px] font-pops font-semibold text-[#000]'>Swathi</h3>
            <p className='text-[14px] font-pops font-semibold text-[#4D4D4D]'>Sure!</p>
          </div>
          <button className='bg-primary rounded pl-[10px] pr-[10px] pt-[5px] pb-[5px] ml-[115px] font-pops text-[20px] font-semibold text-white'>Unblock</button>
        </div>
        <div className='border-b w-[350px] mx-auto mt-[10px]'></div>


        <div className='ml-[20px] mt-[17px] flex items-center'>
        <img src={fthree} alt=''></img>
          <div className='ml-[14px] '>
            <h3 className='text-[18px] font-pops font-semibold text-[#000]'>Kiran</h3>
            <p className='text-[14px] font-pops font-semibold text-[#4D4D4D]'>Hi.....</p>
          </div>
          <button className='bg-primary rounded pl-[10px] pr-[10px] pt-[5px] pb-[5px] ml-[130px] font-pops text-[20px] font-semibold text-white'>Unblock</button>
        </div>
        <div className='border-b w-[350px] mx-auto mt-[10px]'></div>

        <div className='ml-[20px] mt-[17px] flex items-center'>
        <img src={ffour} alt=''></img>
          <div className='ml-[14px] '>
            <h3 className='text-[18px] font-pops font-semibold text-[#000]'>Tejeshwini C</h3>
            <p className='text-[14px] font-pops font-semibold text-[#4D4D4D]'>I will call him today.</p>
          </div>
          <button className='bg-primary rounded pl-[10px] pr-[10px] pt-[5px] pb-[5px] ml-[40px] font-pops text-[20px] font-semibold text-white'>Unblock</button>
        </div>
    </div>
    </div>
  )
}

export default Blocked