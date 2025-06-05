import React from 'react'
const Footer = () => {

    function handleClick() {
        window.open('https://github.com/yogesh-chaturvedi', '_blank')
    }

    return (
        <div>
            <div className="footer bg-gray-950 text-white text-center w-full px-2 py-1">
                <h3 className='text-2xl'><span className='text-blue-600'>&lt;Lock</span><span className='text-blue-600'>Vault&gt;</span></h3>
                <p className='text-lg'><span>Created By Yogesh Chaturvedi</span>
                    <span><i onClick={handleClick} className="fa-brands fa-square-github ml-3 cursor-pointer"></i></span>
                </p>
            </div>
        </div>
    )
}

export default Footer
