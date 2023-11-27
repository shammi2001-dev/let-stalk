import React, { useEffect, useState } from 'react'
import gone from '../../assets/gone.png'
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { useSelector } from 'react-redux';

const Groupslist = () => {
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const db = getDatabase();
  const [show, setShow] = useState(false);
  const [groupname, setgroupname] = useState('');
  const [grouptagname, setgrouptagname] = useState('');
  const [grouplist, setgrouplist] = useState([])

  let handleCreateGroupModal = () => {
    setShow(!show)
  }
  const handleCreateGroup = () => {
    set(push(ref(db, 'group/')), {
      adminid: data.uid,
      adminname: data.displayName,
      groupname: groupname,
      grouptagname: grouptagname
})
  }
  useEffect(() => {
    const groupRef = ref(db, 'group/');
    onValue(groupRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        if(item.val().adminid != data.uid){
        arr.push(item.val());
        }
      })
      setgrouplist(arr)
    });
  }, [])
  return (
    <div className='ml-[40px]'>
      <div className='shadow shadow-box rounded-[20px] pb-[21px] h-[420px] overflow-y-scroll'>
        <div className='flex justify-between pl-[20px] pt-[15px] pb-[10px]'>
          <h2 className='text-[20px] font-pops font-semibold text-[#000]'>Groups List</h2>
          {
            show ? <button onClick={handleCreateGroupModal} className=' bg-red-500 text-white p-3 rounded-lg'>Go Back</button>
              :
              <button onClick={handleCreateGroupModal} className=' bg-primary text-white p-3 rounded-lg'>Create Group</button>
          }
        </div>

        <div>
          {
            show ?
              <div className='text-center'>
                <input onChange={(e) => setgroupname(e.target.value)} className='border border-[#808080] outline-none p-3 rounded-lg mt-5' type='text' placeholder='Group Name'></input>
                <input onChange={(e) => setgrouptagname(e.target.value)} className='border border-[#808080] outline-none p-3 rounded-lg mt-5' type='text' placeholder='Group Tagname'></input>
                <div>
                  <button onClick={handleCreateGroup} className=' bg-primary text-white p-3 rounded-lg mt-5'>Create Group</button>
                </div>
              </div>
              :
              <div>
                {
                  
                    grouplist.length == 0 ?
                    <p className='text-center mt-[150px] text-red-500 font-pops font-bold text-[18px]'>No group has been created yet.</p>
                    :
                  grouplist.map((item)=>(
                    <div className='ml-[20px] mt-[10px] flex items-center'>
                    <img src={gone} alt=''></img>
                    <div className='ml-[14px] '>
                      <h3 className='text-[18px] font-pops font-semibold text-[#000]'>{item.groupname}</h3>
                      <p className='text-[14px] font-pops font-semibold text-[#4D4D4D]'>{item.grouptagname}</p>
                      <div className='border-b w-[350px] mx-auto mt-[10px]'></div>
                    </div>
                  </div>
                  ))
                }
             
              </div>
          }
        </div>

      </div>
    </div>
  )
}

export default Groupslist