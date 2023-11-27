import React from 'react'
import fone from '../../assets/fone.png'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { getDatabase, ref, onValue, set, remove, push} from "firebase/database";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
const Friends = () => {
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const db = getDatabase();

  const [friend, setFriend] = useState([])
  useEffect(() => {
    const friendsRef = ref(db, 'friends/');
    onValue(friendsRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
       if(item.val().receiverid == data.uid || item.val().senderid == data.uid){
        arr.push({...item.val(), id: item.key});
       }     
      })
      setFriend(arr)
    });
  }, [])
  const handleBlock = (item)=>{
    console.log('block', item);
    if(data.uid == item.senderid){
      set(push(ref(db, 'block/')), {
        block: item.receivername,
        blockid: item.receiverid,
        blockby: item.sendername,
        blockbyid: item.senderid
      }).then(()=>{
        remove(ref(db, 'friends/'))
      })
    }else{
      set(push(ref(db, 'block/')), {
        block: item.sendername,
        blockid: item.senderid,
        blockby: item.receivername,
        blockbyid: item.receiverid
      }).then(()=>{
        remove(ref(db, 'friends/'))
      })
    }

  }

  return (
    <div className='ml-[20px]'>
      <div className='shadow shadow-box rounded-[20px] pb-[21px] pt-[5px] h-[420px] overflow-y-scroll'>
        <div className='flex justify-between pl-[20px] pt-[10px] pb-[10px]'>
          <h2 className='text-[20px] font-pops font-semibold text-[#000]'>Friends</h2>
          <BsThreeDotsVertical className='text-[25px] text-primary mr-[10px]'></BsThreeDotsVertical>
        </div>

        <div className='ml-[20px] mt-[10px]'>
          {
            friend.length == 0 ?
            <p className='text-center mt-[150px] text-red-500 font-pops font-bold text-[18px]'>You have no friends yet.</p>
            :
            friend.map((item) => (
              <div>
                <div className='flex items-center py-[10px]'>
                  <img src={fone} alt=''></img>
                  <div className='ml-[14px] '>
                    <h3 className='text-[18px] font-pops font-semibold text-[#000]'>
                      {
                        item.receiverid == data.uid ? item.sendername : item.receivername
                      }
                    </h3>
                  </div>
                  <button onClick={()=>handleBlock(item)} className='bg-primary rounded pl-[10px] pr-[10px] pt-[5px] pb-[5px] ml-[120px] font-pops text-[20px] font-semibold text-white'>Block</button>

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

export default Friends