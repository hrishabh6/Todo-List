import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-green-600 flex justify-between items-center'>
        <div className="logo p-4 font-bold text-xl mx-9">Taskit</div>
        <ul className='flex gap-10 text-xl p-3 text-white font-bold mx-9 items-center'>
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
