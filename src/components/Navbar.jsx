import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-gray-900 text-white py-5'>
        <div className="logo mx-10">
            <span className='font-bold text-2xl'>Smart Manager</span>
        </div>
        <ul className="flex mx-10 gap-5">
            <li className='cursor-pointer text-xl hover:font-bold'>Home</li>
            <li className='cursor-pointer text-xl hover:font-bold'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
