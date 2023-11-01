import React, { useState } from 'react'
import registration from '../../assets/registration.png'
import {RiEyeFill,RiEyeCloseFill} from 'react-icons/ri'
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots  } from  'react-loader-spinner'

const Registration = () => {
    const auth = getAuth();
    const navigate = useNavigate()
    const [email, setEmail]=useState('')
    const [fullName, setfullName]=useState('')
    const [password, setpassword]=useState('')

    const [emailerr, setEmailerr]=useState('')
    const [fullNameerr, setfullNameerr]=useState('')
    const [passworderr, setpassworderr]=useState('')
     
    const [showPassword, setShowPassword]=useState(false)
    const [success, setSuccess]=useState('')

    const [loading, setLoading] = useState(false)

const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr('')
}
const handlefullName = (e) => {
    setfullName(e.target.value);
    setfullNameerr('')
}
const handlepassword = (e) => {
    setpassword(e.target.value);
    setpassworderr('')
}

const handleSign = () => {
    console.log('ok');
    if(!email){
        setEmailerr('PLEASE ENTER YOUR EMAIL FIRST')
    }else{
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setEmailerr('INVALID EMAIL')
        }
    }
    if(!fullName){
        setfullNameerr('PLEASE ENTER YOUR FULL NAME FIRST')
    }
    if(!password){
        setpassworderr('PLEASE ENTER YOUR PASSWORD FIRST')
    // }else if(!/^(?=.*[a-z])/.test(password)){
    //     setpassworderr('The string must contain at least 1 lowercase alphabetical character')
    // }else if(!/^(?=.*[A-Z])/.test(password)){
    //     setpassworderr('The string must contain at least 1 uppercase alphabetical character')
    // }else if(!/^(?=.*[0-9])/.test(password)){
    //     setpassworderr('The string must contain at least 1 numeric character')
    // }else if(!/^(?=.{8,})/.test(password)){
    //     setpassworderr('The string must be eight characters or longer')
    }
    if(email && fullName && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        
        .then(() => {
            sendEmailVerification(auth.currentUser)
        .then(() => {
        toast.success('Registration done & please verify your email') ;
        setEmail('');
        setfullName('');
        setpassword('');
        
        setTimeout(()=>{
        navigate('/login')
        },3000)
        });
        setLoading(false)
    })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode)
          if(errorCode.includes('auth/email-already-in-use')){
            setEmailerr('Email is already in used')
          }
          setLoading(false)
        });
      
    }
}
  return (
    <div className='flex'>
        <div className='w-1/2 flex justify-end mr-[69px]'>
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
            <div className='mt-[180px]'>
            <h1 className='font-nun font-bold text-[34px] text-[#11175D]'>Get started with easily register</h1>
            <p className='font-nun text-[#808080] text-[20px]'>Free register and you can enjoy it</p>
            
            <div className='relative mt-[60px]'>
                <input onChange={handleEmail} value={email} className='border border-[#808080] rounded-lg outline-none px-[52px] py-[26px]' type='email'></input>
                <p className='absolute top-[-8px] left-[34px] px-[18px] bg-white font-nun font-semibold text-[13px] tracking-[1px]'>Email Address</p>
                <p className='text-red-500 font-bold'>{emailerr}</p>
            </div>
            <div className='relative mt-[60px]'>
                <input onChange={handlefullName} value={fullName} className='border border-[#808080] rounded-lg outline-none px-[52px] py-[26px]' type='text'></input>
                <p className='absolute top-[-8px] left-[34px] px-[18px] bg-white font-nun font-semibold text-[13px] tracking-[1px]'>Full name</p>
                <p className='text-red-500 font-bold'>{fullNameerr}</p>
            </div>
            <div className='relative mt-[60px]'>
                <input onChange={handlepassword} value={password} className='border border-[#808080] rounded-lg outline-none px-[52px] py-[26px]' type={showPassword?'text':'password'}></input>
                <p className='absolute top-[-8px] left-[34px] px-[18px] bg-white font-nun font-semibold text-[13px] tracking-[1px]'>Password</p>
                {
                    showPassword?
                <RiEyeFill onClick={()=>setShowPassword (!showPassword)} className='absolute top-[34px] right-[215px]'/>
                :
                <RiEyeCloseFill onClick={()=>setShowPassword (!showPassword)} className='absolute top-[34px] right-[215px]'/>
                }
                <p className='text-red-500 font-bold'>{passworderr}</p>
            </div>
            {
            loading?
            <ThreeDots 
             height="80" 
             width="80" 
             radius="9"
             color="#4fa94d" 
             ariaLabel="three-dots-loading"
             wrapperStyle={{}}
             wrapperClassName=""
            visible={true}
            />
            :
            <div onClick={handleSign} className='mt-[50px] mb-[35px] cursor-pointer'>
            <button className='font-nun font-semibold text-[20px] text-white bg-primary px-[115px] py-[20px] rounded' href=''>Sign up</button>
            </div>
         }
            
            <p className='font-sans text-[13px] text-[#03014C] ml-[20px]'>Already  have an account ?<span className='text-[#EA6C00] font-bold ml-[4px]'><Link to='/login'>Sign In</Link></span></p>
            </div>
        </div>
        <div className='w-1/2'>
            <img className='h-screen w-full object-cover' src={registration}/>
        </div>
    </div>
  )
}

export default Registration