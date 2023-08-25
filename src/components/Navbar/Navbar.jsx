import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className='flex justify-between text-center sticky bg-green-500 px-3 py-1'>
            <h1 className='m-0 p-0 text-white font-bold mb-2 text-[22px]'>Facebak</h1>
            <ul className="flex gap-3 justify-center text-white p-3">
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/signin"}>Signin</Link></li>
                <li><Link to={"/signup"}>Signup</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;