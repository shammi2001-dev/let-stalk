import React, { useEffect, useState } from 'react'
import fone from '../../assets/fone.png'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux'
const UserList = () => {
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [friendreqlist, setFriendreqlist] = useState([])
  const [friendUl, setFriendUl] = useState([])
  const [searchdata, setsearchdata] = useState([])

  useEffect(() => {
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
      console.log(snapshot.val());
      let arr = []
      snapshot.forEach(item => {
        if (item.key != data.uid) {
          arr.push({ ...item.val(), userid: item.key })
        }
      })
      setUserList(arr)
    });
  }, [])

  const handleAddfriend = (item) => {
    console.log('okkkk', item);
    set(push(ref(db, 'addfriend/')), {
      sendername: data.displayName,
      senderid: data.uid,
      sendermail: data.email,
      receivername: item.username,
      receiverid: item.userid,
      receivermail: item.email
    });
  }
  useEffect(() => {
    const addfriendRef = ref(db, 'addfriend/');
    onValue(addfriendRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        console.log(item.val());
        arr.push(item.val().receiverid + item.val().senderid)
      })
      setFriendreqlist(arr)
    });
  }, [])

  //  from friends
  useEffect(() => {
    const friendsRef = ref(db, 'friends/');
    onValue(friendsRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        arr.push(item.val().receiverid + item.val().senderid)
      })
      setFriendUl(arr)
    });
  }, [])
  const handlesearch = (e) => {
    let arr = []
    if (e.target.value.length == 0) {
      setsearchdata([])
    } else {
      userList.map((item) => {
        if ((item.username.toLowerCase().includes(e.target.value.toLowerCase()))) {
          arr.push(item)
          setsearchdata(arr)
        }
      })
    }

  }

  return (
    <div className='ml-[20px]'>
      <div className='shadow shadow-box rounded-[20px] pb-[21px] pt-[5px] h-[350px] overflow-y-scroll'>
        <div className='flex justify-between pl-[20px] pt-[10px] pb-[10px] mt-[10px]'>
          <h2 className='text-[20px] font-pops font-semibold text-[#000]'>User List</h2>
          <BsThreeDotsVertical className='text-[25px] text-primary mr-[10px]'></BsThreeDotsVertical>
        </div>

        <div className='relative shadow shadow-box rounded-[20px] mb-[30px] flex ml-[20px] mr-[20px]'>
          <BsSearch className='absolute top-[25px] left-[20px] text-[25px]'></BsSearch>

          <input onChange={handlesearch} type='search' placeholder='Search' className='text-[16px] font-medium text-[#3D3D3D] font-pops ml-[70px] mt-[20px] mb-[15px] p-[5px] outline-none'></input>
        </div>
        <div>
          {
            userList.length == 0 ?
              <p className='text-center mt-[150px] text-red-500 font-pops font-bold text-[18px]'>No user yet.</p>
              :
              searchdata.length > 0 ?
                searchdata.map((item) => (
                  <div className='ml-[20px] mt-[10px] flex items-center'>
                    <img src={fone} alt=''></img>
                    <div className='ml-[14px] '>
                      <h3 className='text-[18px] font-pops font-semibold text-[#000]'>{item.username}</h3>
                      <p className='text-[14px] font-pops font-semibold text-[#4D4D4D]'>{item.email}</p>
                    </div>
                    {
                      friendUl.includes(data.uid + item.userid) ||
                        friendUl.includes(item.userid + data.uid)
                        ?
                        <button className='bg-primary rounded-lg py-[5px] px-[20px] font-pops text-[20px] font-semibold text-white'>Friend</button>
                        :
                        friendreqlist.includes(data.uid + item.userid) ||
                          friendreqlist.includes(item.userid + data.uid)
                          ?
                          <button className='bg-primary rounded-lg py-[5px] px-[20px] font-pops text-[20px] font-semibold text-white'>Pending</button>
                          :
                          <button onClick={() => handleAddfriend(item)} className='bg-primary rounded-lg py-1 px-[25px] font-pops text-[24px] font-semibold text-white'>+</button>
                    }


                  </div>
                ))
                :
                userList.map((item) => (
                  <div className='ml-[20px] mt-[10px] flex items-center'>
                    <img src={fone} alt=''></img>
                    <div className='ml-[14px] '>
                      <h3 className='text-[18px] font-pops font-semibold text-[#000]'>{item.username}</h3>
                      <p className='text-[14px] font-pops font-semibold text-[#4D4D4D]'>{item.email}</p>
                    </div>
                    {
                      friendUl.includes(data.uid + item.userid) ||
                        friendUl.includes(item.userid + data.uid)
                        ?
                        <button className='bg-primary rounded-lg py-[5px] px-[20px] font-pops text-[20px] font-semibold text-white'>Friend</button>
                        :
                        friendreqlist.includes(data.uid + item.userid) ||
                          friendreqlist.includes(item.userid + data.uid)
                          ?
                          <button className='bg-primary rounded-lg py-[5px] px-[20px] font-pops text-[20px] font-semibold text-white'>Pending</button>
                          :
                          <button onClick={() => handleAddfriend(item)} className='bg-primary rounded-lg py-1 px-[25px] font-pops text-[24px] font-semibold text-white'>+</button>
                    }


                  </div>
                ))
          }


          <div className='border-b w-[350px] mx-auto mt-[10px]'></div>
        </div>

      </div>
    </div>
  )
}

export default UserList