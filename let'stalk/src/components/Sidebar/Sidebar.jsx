import React, { useState, createRef } from 'react'
import profile from '../../assets/profile.png'
import { AiOutlineHome, AiFillMessage } from 'react-icons/ai'
import { FaRegBell } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { BiSolidCloudUpload } from 'react-icons/bi'
import { TbLogout } from 'react-icons/tb'
import { getAuth, signOut, updateProfile } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux'
import { userLoginInfo } from '../../slices/userSlice'

const Sidebar = () => {
  const data = useSelector(state => state.userLoginInfo.userInfo);
  console.log(data.displayName, 'data');
  const dispatch = useDispatch();
  // cropper
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  let [profilePhoto, setProfilePhoto] = useState('')

  let [profileModal, setProfileModal] = useState()
  const auth = getAuth();
  const navigate = useNavigate()
  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('done')
      dispatch(userLoginInfo(null));
    localStorage.removeItem('userLoginInfo')
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }).catch((error) => {
      console.log(error.code)
    });

  }
  let handleProfileModal = () => {
    setProfileModal(true)
  }
  // cropper
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(storage, auth.currentUser.uid);
      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          // setProfilePhoto(downloadURL)
          console.log(downloadURL, 'DOWNLOADURL');
          updateProfile(auth.currentUser, {
            photoURL: downloadURL
          }).then(() => {
            setProfileModal(false);
            setImage('')
            setCropData('')
          })
        });
      });

    }
  };

  return (
    <>
      {profileModal
        ?
        <div className='w-full h-screen bg-primary absolute flex justify-center items-center'>
          <div className='w-[500px] bg-white rounded-2xl text-center p-10'>
            <h1 className='text-2xl font-bold font-pops '>Upload Your Profile Photo</h1>
            <input onChange={onChange} className='mt-4 block mx-auto mb-5' type='file' />
            {
              image ?
                <div className='w-[120px] h-[120px] rounded-full overflow-hidden mx-auto mb-5'>
                  <div
                    className="img-preview"
                    style={{ width: "100%", float: "left", height: "300px" }}
                  />
                </div> :

                <div className='w-[120px] h-[120px] rounded-full overflow-hidden mx-auto mb-5'>
                  <img src={data?.photoURL} alt=''></img>

                </div>
            }
            {/* <div className='w-[400px] h-[300px] overflow-hidden mb-10'> */}
            {
              image &&
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
            }
            {/* </div> */}
            <button onClick={getCropData} className='bg-primary py-2 px-2 text-white rounded'>Upload</button>
            <button onClick={() => setProfileModal(false)} className='bg-red-500 py-2 px-2 text-white rounded ml-5'>Cancel</button>
          </div>
        </div>
        :
        <div className='bg-primary h-screen rounded-lg pt-[38px]'>
          <div className='w-[96px] h-[96px] mx-auto rounded-full relative overflow-hidden group'>
            <img src={data?.photoURL} alt='' className=' w-full h-full'></img>
           

            <div onClick={handleProfileModal} className='w-0 h-full group-hover:w-full bg-[rgba(0,0,0,.4)] absolute top-0 left-0 flex justify-center items-center'>
              <BiSolidCloudUpload className='text-4xl text-white'></BiSolidCloudUpload>
            </div>
          </div>
          <h1 className='font-sans font-semibold text-[16px] text-white text-center'>{data?.displayName}</h1>

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
            <TbLogout onClick={handleSignOut} className='text-5xl mx-auto text-[#BAD1FF]'></TbLogout>
          </div>
        </div>
      }

    </>

  )
}

export default Sidebar