import React, { useEffect, useState } from 'react'
import fone from '../../assets/fone.png'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { getDatabase, ref, onValue, set, remove, push } from "firebase/database";
import { useSelector } from 'react-redux';

const Friendreq = () => {
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const db = getDatabase();
  const [friendreq, setFriendreq] = useState([])
  useEffect(() => {
    const addfriendRef = ref(db, 'addfriend/');
    onValue(addfriendRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        if (item.val().receiverid == data.uid) {
          arr.push({...item.val(), id: item.key});
        }
      })
      setFriendreq(arr)
    });

  }, [])

  const handleAccept = (item)=>{
    console.log('rufserigujserogij', item);
    set(push(ref(db, 'friends/')), {
      ...item
    }).then(()=>{
      remove(ref(db, 'addfriend/'))
    })
  }

  return (
    <div className='ml-[40px] mt-[50px]'>
      <div className='shadow shadow-box rounded-[20px] pb-[21px] h-[420px] overflow-y-scroll'>
        <div className='flex justify-between pl-[20px] pt-[10px] pb-[10px]'>
          <h2 className='text-[20px] font-pops font-semibold text-[#000]'>Friend  Request</h2>
          <BsThreeDotsVertical className='text-[25px] text-primary mr-[10px]'></BsThreeDotsVertical>
        </div>
        <div className='ml-[20px] mt-[10px]'>
          {
            friendreq.length == 0 ?
            <p className='text-center mt-[150px] text-red-500 font-pops font-bold text-[18px]'>You have no friend requests.</p>
            :
            friendreq.map((item) => (
              <div>
                <div className='flex items-center py-[10px]'>
                  <img src={fone} alt=''></img>
                  <div className='ml-[14px] '>
                    <h3 className='text-[18px] font-pops font-semibold text-[#000]'>{item.sendername}</h3>
                  </div>
                  <button onClick={()=>handleAccept(item)} className='bg-primary rounded pl-[10px] pr-[10px] pt-[5px] pb-[5px] ml-[85px] font-pops text-[20px] font-semibold text-white'>Accept</button>

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

export default Friendreq