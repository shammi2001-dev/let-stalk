import React,{useState} from 'react'
import login from '../../assets/login.png'
import {RiEyeFill,RiEyeCloseFill} from 'react-icons/ri'
import { Link, useNavigate } from "react-router-dom";
import google from '../../assets/google.png'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../../slices/userSlice';

const Login = () => {
  const auth = getAuth();
  const dispatch = useDispatch()
  const provider = new GoogleAuthProvider();
  const Navigate = useNavigate()
  const [email, setEmail]=useState('')
  const [password, setpassword]=useState('')

  const [emailerr, setEmailerr]=useState('')
  const [passworderr, setpassworderr]=useState('')

  const [showPassword, setShowPassword]=useState(false)
  const [error, setError] = useState('')

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr('')
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
if(email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
  signInWithEmailAndPassword(auth, email, password)
  .then((user) => {
    toast.success('Login successfull');
    console.log(user.user)
    dispatch(userLoginInfo(user.user));
    localStorage.setItem('userLoginInfo',JSON.stringify(userLoginInfo(user.user)))
    setError('');
    setTimeout(()=>{
    Navigate('/home')
    },3000)
    
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
    if(errorCode.includes('auth/invalid-login-credentials')){
      setError('Please enter right email & password')
    }
  });
  }
}
const handleGoogleSignIn = ()=>{
  signInWithPopup(auth, provider)
  .then(() => {
    setTimeout(()=>{
      Navigate('/home')
      },3000)
  }).catch((error) => {
    const errorCode = error.code;
    console.log(errorCode)
   
  });
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
            <h1 className='font-sans font-bold text-[34px] text-[#11175D]'>Login to your account!</h1>
            <div onClick={handleGoogleSignIn} className='flex border border-[#808080] justify-center px-[42px] py-[22px] rounded mt-[30px]'>
             <img src={google} alt=''></img>
             <p className='font-sans font-bold text-[14px] text-[#03014C] items-center ml-[10px]  '>Login with Google</p>
            </div>
            
            <p className='text-red-500 font-bold mt-4'>{error}</p>
          
            <div className='relative mt-[60px]'>
            <input onChange={handleEmail} value={email} className='border-b border-[#808080] outline-none px-[52px] py-[26px]' type='email'></input>
            <p className='absolute top-0 left-0 font-nun font-semibold text-[13px] tracking-[1px]'>Email Address</p>
                
                <p className='text-red-500 font-bold'>{emailerr}</p>

            </div>
            <div className='relative mt-[60px]'>
            <input onChange={handlepassword} value={password} className='border-b border-[#808080] outline-none px-[52px] py-[26px]' type={showPassword?'text':'password'}></input>
                <p className='absolute top-0 left-0 font-nun font-semibold text-[13px] tracking-[1px]'>Password</p>
                {
                    showPassword?
                <RiEyeFill onClick={()=>setShowPassword (!showPassword)} className='absolute top-[30px] right-[120px]'/>
                :
                <RiEyeCloseFill onClick={()=>setShowPassword (!showPassword)} className='absolute top-[30px] right-[120px]'/>
                }
                <p className='text-red-500 font-bold'>{passworderr}</p>
            </div>
            <div onClick={handleSign} className='mt-[64px] mb-[40px] cursor-pointer'>
            <button className='font-nun font-semibold text-[20px] text-white bg-primary px-[115px] py-[20px] rounded' href=''>Login to Continue</button>
            </div>
          <div className='text-center'>
            <p className='font-sans text-[13px] text-[#03014C]'>Don’t have an account ?<span className='text-[#EA6C00] font-bold'> <Link to='/registration'>Sign Up</Link></span></p>
            <p className='font-sans text-[16px] text-[#EA6C00] font-bold'><Link to='/forgotPassword'>Forgot password</Link></p>
            </div>
            </div>
        </div>
        <div className='w-1/2'>
        <img className='h-screen w-full object-cover' src={login}/>
        </div>
    </div>
  )
}

export default Login