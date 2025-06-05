import React from 'react'
import Navbar from '../components/Navbar'
import Manager from '../components/Manager'
import Footer from '../components/Footer'
function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className='sticky top-0 z-10'>
                <Navbar />
            </div>
            <div className="flex-1 overflow-y-auto">
                <Manager />
            </div>
            <div className='sticky bottom-0 z-10'>
                <Footer />
            </div>
        </div>
    )
}

export default Home
