import React from 'react'
import NavBar from '../Component/NavBar.jsx'
import Globe from '../assets/globe.png'
import '../index.css'

const Home = () => {
  return (
    <>
      <NavBar></NavBar>
      
    <div className='bg-black min-h-screen font-nunito text-bold'>
      <div className='flex items-center justify-around pt-40'>
        <div className="flex flex-col gap-5">
          <div className='text-white text-6xl flex flex-col gap-4'>
            <h1>Sulawesi Tengah</h1>
            <h1>Menunggu Petualanganmu</h1>
          </div>
          <div className='text-white text-xl/8 w-[400px]'>
            <p>Dari pantai, danau, hingga budaya temukan surga tersembunyi di jantung indonesia</p>
          </div>
        </div>
        <div>
          <img src={Globe} alt="" width={400}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
