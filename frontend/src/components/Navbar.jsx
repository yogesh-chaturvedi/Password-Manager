import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {

    const navigate = useNavigate();
    const [showInfo, setShowInfo] = useState(false)
    const UserName = localStorage.getItem("Username")
    const UserEmail = localStorage.getItem("Useremail")
    // function to handle logout 
    function handleLogout() {
        localStorage.removeItem("token")
        localStorage.removeItem("Username")
        localStorage.removeItem("Useremail")
        toast('LogOut Successfull', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
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

    //  function to show user's info
    function handldeUserInfo() {
        if (showInfo === false) {
            setShowInfo(true)
        }
        else {
            setShowInfo(false)
        }
    }

    return (

        <nav className='justify-between items-center flex  bg-gray-950 text-white w-full h-14 sm:px-5 shadow-md'>
            <div className='logo px-5 text-2xl font-bold'>
                <span className='text-blue-600'>&lt;/Lock</span><span className='text-blue-600'>Vault&gt;</span>
            </div>

            <div className='flex gap-3 items-center relative'>
                <div onClick={handleLogout} className="logOut bg-red-600 font-semibold text-white px-2 text-lg rounded-2xl cursor-pointer">LogOut</div>

                <div onClick={handldeUserInfo} className="userInfo border-2 cursor-pointer h-7 w-7 rounded-full text-center"><i className="fa-solid fa-user"></i></div>
                {
                    showInfo && (
                        <div className='absolute top-10 right-2 sm:right-4 z-50 bg-gray-900 border border-gray-600 rounded-xl p-3 w-64 sm:w-72 max-w-[90vw] shadow-lg'>
                            <ul className='space-y-2 text-sm sm:text-base'>
                                <li className='truncate'>
                                    <span className='font-semibold text-gray-300'>Username:</span> {UserName?.toUpperCase()}
                                </li>
                                <li className='truncate'>
                                    <span className='font-semibold text-gray-300'>Email:</span> {UserEmail}
                                </li>
                                <li>
                                    <span className='font-semibold text-gray-300'>Status:</span> Logged In
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>

        </nav>
    )
}

export default Navbar
