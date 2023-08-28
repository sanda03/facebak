import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/useAuth';

function Navbar() {
    const userConnection = useContext(UserContext);

    const logout = () => {
        userConnection.logout();
    };

    return (
        <nav className='flex justify-between text-center sticky bg-green-500 px-3 py-1'>
            <h1 className='m-0 p-0 text-white font-bold mb-2 text-[22px]'>Facebak</h1>
            <ul className="flex gap-3 justify-center text-white p-3">
                {
                    !userConnection.isConnected() ?
                        <>
                            <li><Link to={"/signin"}>Signin</Link></li>
                            <li><Link to={"/signup"}>Signup</Link></li>
                        </>
                        :
                        <>
                            <li><Link to={"/"}>Home</Link></li>
                            <li onClick={logout} className='cursor-pointer'>Logout</li>
                        </>
                }
            </ul>
        </nav>
    );
}

export default Navbar;