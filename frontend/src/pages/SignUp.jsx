import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';



function SignUp() {

  const [signUpInfo, setSignUpInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  // function to handel changes of input fields 
  function handelChange(e) {
    const { name, value } = e.target
    setSignUpInfo((prev) => ({ ...prev, [name]: value }))
  }


  // function to handel submit input fields data in database
  async function handelSubmit(e) {
    e.preventDefault()

    try {
      let response = await axios({
        method: "post",
        url: 'http://localhost:3000/auth/signUp',
        data: signUpInfo
      })
      // console.log(response.data)
      const { message, success, error } = response.data
      if (success) {
        toast(message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          navigate('/login')
        }, 1500);

      }
    }
    catch (error) {
      // console.log("there is an error", error)
      const message = error.response?.data?.error?.details[0]?.message || error.response.data.message
      toast(message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      if (message.toLowerCase().includes("already signup")) {
        setTimeout(() => {
          navigate('/login')
        }, 1500);
      }
    }
  }


  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 via-purple-400 to-pink-300'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container border-2 flex flex-col items-center justify-center w-[80vw] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl min-h-[30vh] rounded-3xl bg-white shadow-md">
        <h1 className='heading underline mb-4 pt-2 font-bold text-3xl text-center'>SignUp</h1>

        <form className='flex w-[80%] flex-col gap-5' onSubmit={handelSubmit} >

          {/* name */}
          <div className='w-full flex flex-col'>
            <label className='font-bold text-2xl ml-2' htmlFor="name">Name</label>
            <input value={signUpInfo.name} onChange={handelChange} className='border-2 outline-none px-2 rounded-3xl' type="text" name="name" autoFocus placeholder='Enter your name here' />
          </div>

          {/* email */}
          <div className='w-full flex flex-col'>
            <label className='font-bold text-2xl ml-2' htmlFor="Email">Email</label>
            <input value={signUpInfo.email} onChange={handelChange} className='border-2 outline-none px-2 rounded-3xl' type="text" name="email" placeholder='Enter your email here' />
          </div>

          {/* password */}
          <div className='w-full flex flex-col'>
            <label className='font-bold text-2xl ml-2' htmlFor="password">Password</label>
            <input value={signUpInfo.password} onChange={handelChange} className='border-2 outline-none px-2 rounded-3xl' type="password" name="password" placeholder='Enter your password here' />
          </div>


          {/* submit button */}
          <div className='text-center'>
            <button type='submit' className='border-2 px-4  text-lg font-bold rounded-3xl text-white bg-blue-700 cursor-pointer'>SignUp</button>
            <div className='font-semibold py-2'>If Already have an account, Then :<span className='underline text-blue-700'><Link to='/login'>Login</Link></span></div>
          </div>
        </form>

      </div>
    </div>
  )
}

export default SignUp
