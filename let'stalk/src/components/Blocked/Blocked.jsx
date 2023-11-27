import React from 'react'
import fone from '../../assets/fone.png'
import {BsThreeDotsVertical} from 'react-icons/bs'
import { getDatabase, ref, onValue, set, remove, push} from "firebase/database";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'

const Blocked = () => {
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const db = getDatabase();
  const [block, setBlock] = useState([])
  useEffect(() => {
    const blockRef = ref(db, 'block/');
    onValue(blockRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        if (item.val().blockbyid == data.uid) {
          arr.push({
            id: item.key,
            block: item.val().block,
            blockid: item.val().blockid,
          })
        }else{
          arr.push({
            id: item.key,
            blockby: item.val().blockby,
            blockbyid: item.val().blockbyid,
          })
        }
      })
      setBlock(arr)
    });

  }, [])
const handleunblock = (item)=>{
set(push(ref(db, 'friends/')),{
  sendername: item.block,
  senderid: item.blockid,
  receivername: data.displayName,
  receiverid: data.uid
}).then(()=>{
  remove(ref(db, 'block/'+ item.id))
})
}
  return (
    <div className='ml-[20px] mt-[10px]'>
    <div className='shadow shadow-box rounded-[20px] pb-[21px] pt-[5px] h-[420px] overflow-y-scroll overflow-x-hidden'>
        <div className='flex justify-between pl-[20px] pt-[10px] pb-[10px]'>
           <h2 className='text-[20px] font-pops font-semibold text-[#000]'>Blocked Users</h2>
           <BsThreeDotsVertical className='text-[25px] text-primary mr-[10px]'></BsThreeDotsVertical>
        </div>
        <div className='ml-[20px] mt-[10px]'>
          {
            block.length == 0 ?
            <p className='text-center mt-[150px] text-red-500 font-pops font-bold text-[18px]'>No blocked account.</p>
            :
            block.map((item) => (
              <div>
                <div className='flex items-center py-[10px]'>
                  <img src={fone} alt=''></img>
                  <div className='ml-[14px] '>
                    <h3 className='text-[18px] font-pops font-semibold text-[#000]'>{item.block}</h3>
                    <h3 className='text-[18px] font-pops font-semibold text-[#000]'>{item.blockby}</h3>
                  </div>
                  {
                    !item.blockbyid &&
                    <button onClick={()=>{handleunblock(item)}} className='bg-primary rounded pl-[10px] pr-[10px] pt-[5px] pb-[5px] ml-[85px] font-pops text-[20px] font-semibold text-white'>Unblock</button>
                  }
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

export default Blocked