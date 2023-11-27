import React from 'react'
import fone from '../../assets/fone.png'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { getDatabase, ref, onValue, set, remove, push } from "firebase/database";
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { BsSearch } from 'react-icons/bs'


const Mygroups = () => {
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const db = getDatabase();
  const [mygroup, setmygroup] = useState([])
  const [mgsearchdata, setmgsearchdata] = useState([])

  

  useEffect(() => {
    const groupRef = ref(db, 'group/');
    onValue(groupRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        if(item.val().adminid == data.uid){
        arr.push(item.val());
        }
      })
      setmygroup(arr)
    });
  }, [])
  const handlemgsearch = (e) => {
    let arr = []
    if (e.target.value.length == 0) {
      setmgsearchdata([])
    } else {
      mygroup.map((item) => {
        if ((item.username.toLowerCase().includes(e.target.value.toLowerCase()))) {
          arr.push(item)
          setmgsearchdata(arr)
        }
      })
    }

  }

  return (
    <div className='ml-[20px] mt-[10px]'>
      <div className='shadow shadow-box rounded-[20px] pb-[21px] pt-[5px] h-[420px] overflow-y-scroll'>
        <div className='flex justify-between pl-[20px] pt-[10px] pb-[10px]'>
          <h2 className='text-[20px] font-pops font-semibold text-[#000]'>My Groups</h2>
          <BsThreeDotsVertical className='text-[25px] text-primary mr-[10px]'></BsThreeDotsVertical>
        </div>
        <div className='relative shadow shadow-box rounded-[20px] mb-[30px] flex ml-[20px] mr-[20px]'>
          <BsSearch className='absolute top-[25px] left-[20px] text-[25px]'></BsSearch>

          <input onChange={handlemgsearch} type='search' placeholder='Search' className='text-[16px] font-medium text-[#3D3D3D] font-pops ml-[70px] mt-[20px] mb-[15px] p-[5px] outline-none'></input>
        </div>

        <div>
          {
            
              mygroup.length == 0 ?
              <p className='text-center mt-[150px] text-red-500 font-pops font-bold text-[18px]'>You have no group.</p>
              :
              mgsearchdata.length > 0 ?
            mgsearchdata.map((item) => (

              <div>
                <div className='ml-[20px] mt-[10px] flex items-center'>
                  <img src={fone} alt=''></img>
                  <div className='ml-[14px] '>
                    <p>{item.adminname}</p>
                    <h3 className='text-[18px] font-pops font-semibold text-[#000]'>{item.groupname}</h3>
                    <p className='text-[14px] font-pops font-semibold text-[#4D4D4D]'>{item.grouptagname}</p>
                  </div>
                </div>
                <div className='border-b w-[350px] mx-auto mt-[10px]'></div>
              </div>
            ))
            :
            mygroup.map((item) => (

              <div>
                <div className='ml-[20px] mt-[10px] flex items-center'>
                  <img src={fone} alt=''></img>
                  <div className='ml-[14px] '>
                    <p>{item.adminname}</p>
                    <h3 className='text-[18px] font-pops font-semibold text-[#000]'>{item.groupname}</h3>
                    <p className='text-[14px] font-pops font-semibold text-[#4D4D4D]'>{item.grouptagname}</p>
                  </div>
                </div>
                <div className='border-b w-[350px] mx-auto mt-[10px]'></div>
              </div>
            ))
          }

        </div>

      </div>
    </div>
  )
}

export default Mygroups