import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Manager() {

    const [siteUrl, setSiteUrl] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [savedPassword, setSavedPassword] = useState([])

 const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        async function getSavedData() {
            try {
                let token = localStorage.getItem("token")
                let response = await axios({
                    method: "get",
                    url: `${BASE_URL}/api/password`,
                    headers: {
                        Authorization: token,
                    },
                })
                setSavedPassword(response.data)
            }
            catch (err) {
                console.log("there is an error", err)
            }
        }
        getSavedData()
    }, [])


    // handle add Function
    async function handleAdd() {
        if (!siteUrl || !username || !password) {
            return (alert("fill details first"))
        }

        let newArr = {
            siteUrl,
            username,
            password
        }

        try {
            let token = localStorage.getItem("token")
            let response = await axios({
                method: "post",
                url: `${BASE_URL}/api/password`,
                headers: {
                    Authorization: token,
                },
                data: newArr
            })

            setSavedPassword([...savedPassword, response.data]);
            // console.log(savedPassword)

            // tost
            toast('saved Successfully!', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            // To clear the input fields 
            setSiteUrl('')
            setUsername('')
            setPassword('')
        }
        catch (err) {
            console.log("ther is an error", err)
        }
    }

    // copyText function
    function copyText(text) {
        toast('Copied Successfully!', {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    // function to handel Delete
    async function handleDelete(indexToDelete, silent = false) {

        let passwordToDelete = savedPassword[indexToDelete]

        if (!silent) {
            let conf = confirm("You really wnat to delete this Password");
            if (!conf) return;
        }

        try {
            let token = localStorage.getItem("token")
            await axios({
                method: 'delete',
                url: `${BASE_URL}/api/password/${passwordToDelete._id}`,
                headers: {
                    Authorization: token,
                },
            })

            let newVal = savedPassword.filter((_, index) => index !== indexToDelete)
            setSavedPassword(newVal)

            // tost
            if (!silent) {
                toast('Deleted Successfully!', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }

        catch (err) {
            console.log(err)
        }
    }


    // function to handel edit
    async function handleEdit(indexToEdit) {
        await handleDelete(indexToEdit, true)
        setSiteUrl(savedPassword[indexToEdit].siteUrl)
        setUsername(savedPassword[indexToEdit].username)
        setPassword(savedPassword[indexToEdit].password)
    }

    return (
        <div className='bg-gray-100'>
            <div class="absolute inset-0 -z-10 h-full w-full bg-[#f3f4f6] bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#f3f4f6,transparent)]"></div>
            </div>

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

            <div className="flex flex-col h-full px-2 sm:px-4 py-4 bg-gray-100 w-full max-w-screen-sm md:max-w-screen-lg  mx-auto">

                <div className='flex flex-col gap-5 text-center'>
                    <div>
                        <h1 className='font-bold text-4xl'><span className='text-blue-600'>&lt;/Lock</span><span className='text-blue-600'>Vault&gt;</span></h1>
                        <p className='font-semibold text-2xl'>Your own PassWord Manager</p>
                    </div>

                    <div className='inputsContainer flex flex-col gap-4 items-center'>

                        {/* first input */}
                        <input value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} className='border-2 bg-white w-full sm:w-[85%] outline-none px-2 text-black rounded-full border-green-600' type="text" placeholder='Enter Website Url Or Name' />

                        {/* second input */}
                        <div className='flex flex-col sm:flex-row gap-5 w-full sm:w-[85%] relative'>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} className='border-2 w-[full] sm:w-[70%] outline-none px-2 text-black rounded-full border-green-600 bg-white' type="text" placeholder='Enter Username' />

                            {/* third input */}
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className='border-2 w-[full] sm:w-[30%] outline-none px-2 text-black rounded-full border-green-600 bg-white' type="password" placeholder='Enter Password' />
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <button onClick={handleAdd} className='bg-gray-300 flex items-center justify-center p-2 rounded-3xl w-28 font-semibold'>
                            <lord-icon
                                src="https://cdn.lordicon.com/tsrgicte.json"
                                trigger="hover">
                            </lord-icon>Add</button>
                    </div>

                </div>

                {/* Saved Passwords */}
                <div className='savedPass mt-5'>
                    <h2 className='font-bold text-xl'>Your Passwords</h2>
                    {savedPassword.length === 0 ? (
                        <p>You Saved Nothing</p>

                    ) : (
                        <div className="overflow-x-auto">
                            < table className="table-auto min-w-[600px] w-full rounded-2xl overflow-hidden" >
                                <thead className='bg-gray-700'>
                                    <tr>
                                        <th className='py-1.5 '>Site</th>
                                        <th className='py-1.5 '>Username</th>
                                        <th className='py-1.5 '>Passwords</th>
                                        <th className='py-1.5 '>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-200'>
                                    {savedPassword.map((e, index) => {
                                        return (
                                            // table
                                            <tr key={index}>
                                                <td className=' py-2 px-2 text-center border border-white break-all'>
                                                    <div className='flex justify-center gap-2'>
                                                        <a className='hover:text-blue-600' href={e.siteUrl} target='_blank'>{e.siteUrl}</a>
                                                        <i onClick={() => copyText(e.siteUrl)} className="fa-solid fa-copy cursor-pointer pt-1 h-4 w-4" ></i>
                                                    </div>
                                                </td>
                                                <td className=' py-2 px-2  text-center border border-white  break-all '>
                                                    <div className='flex justify-center gap-2'>{e.username}
                                                        <i onClick={() => copyText(e.username)} className="fa-solid fa-copy cursor-pointer pt-1 h-4 w-4" ></i>
                                                    </div>
                                                </td>
                                                <td className=' py-2 px-2 text-center border border-white break-all'>
                                                    <div className='flex justify-center gap-2'> {"*".repeat(e.password.length)}
                                                        <i onClick={() => copyText(e.password)} className="fa-solid fa-copy cursor-pointer pt-1 h-4 w-4" ></i>
                                                    </div>
                                                </td>
                                                <td className=' py-2 px-2  text-center border border-white  break-all'>
                                                    <div className='flex justify-center items-center gap-2'>
                                                        <i onClick={() => handleEdit(index)} className="fa-solid fa-pencil cursor-pointer"></i>
                                                        <span className='border border-black h-5'></span>
                                                        <i onClick={() => { handleDelete(index) }} className="fa-solid fa-trash cursor-pointer"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>

        </div >
    )
}

export default Manager
