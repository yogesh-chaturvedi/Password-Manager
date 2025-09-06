import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

function Reset() {

    const [resetPassword, setResetPassword] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    })
    const navigate = useNavigate()

    // function to handel change of input fields 
    function handleChange(e) {
        const { name, value } = e.target
        setResetPassword((prev) => ({ ...prev, [name]: value }))
    }
    console.log(resetPassword)

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    // function to submit inputs in backend
    async function handleSubmit(e) {
        e.preventDefault()
        if (!resetPassword.email || !resetPassword.newPassword || !resetPassword.confirmPassword) {
            toast("You need to fill all details first", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        try {
            let response = await axios({
                method: "post",
                url: `${BASE_URL}/reset`,
                data: resetPassword
            })
            console.log(response.data)
            const { success, error, message } = response.data;
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
            console.log("there is an error", error)
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

            if (message.toLowerCase().endsWith("you need to signup first")) {
                setTimeout(() => {
                    navigate('/signup')
                }, 1500);
            }
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950'>
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

            <div className="container border border-gray-700 flex flex-col items-center justify-center w-[80vw] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl min-h-[30vh] rounded-3xl bg-gray-900 shadow-lg">
                <h1 className='heading underline mb-4 pt-2 font-bold text-3xl text-center text-gray-100'>
                    Reset Password
                </h1>

                <form onSubmit={handleSubmit} className='flex w-[80%] flex-col gap-5'>

                    {/* email */}
                    <div className='w-full flex flex-col'>
                        <label className='font-bold text-2xl ml-2 text-gray-200' htmlFor="Email">Email</label>
                        <input
                            value={resetPassword.value}
                            onChange={handleChange}
                            className='border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 outline-none px-2 rounded-3xl focus:ring-2 focus:ring-blue-600'
                            type="text"
                            name="email"
                            placeholder='Enter your email here'
                        />
                    </div>

                    {/* new password */}
                    <div className='w-full flex flex-col'>
                        <label className='font-bold text-2xl ml-2 text-gray-200' htmlFor="NewPassword">New Password</label>
                        <input
                            value={resetPassword.newPassword}
                            onChange={handleChange}
                            className='border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 outline-none px-2 rounded-3xl focus:ring-2 focus:ring-blue-600'
                            type="password"
                            name="newPassword"
                            placeholder='Enter your password here'
                        />
                    </div>

                    {/* confirm new password */}
                    <div className='w-full flex flex-col'>
                        <label className='font-bold text-2xl ml-2 text-gray-200' htmlFor="ConfirmNewPassword">Confirm New Password</label>
                        <input
                            value={resetPassword.confirmPassword}
                            onChange={handleChange}
                            className='border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 outline-none px-2 rounded-3xl focus:ring-2 focus:ring-blue-600'
                            type="password"
                            name="confirmPassword"
                            placeholder='Enter your new password here'
                        />
                    </div>

                    {/* submit button */}
                    <div className='text-center'>
                        <button
                            type='submit'
                            className='px-4 py-2 text-lg font-bold rounded-3xl text-white bg-blue-600 hover:bg-blue-700 cursor-pointer'
                        >
                            Save
                        </button>
                        <div className='font-semibold py-2 text-gray-300'>
                            Back To :
                            <span className='underline text-emerald-500 hover:text-emerald-400 ml-1'>
                                <Link to='/login'>LogIn</Link>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Reset
