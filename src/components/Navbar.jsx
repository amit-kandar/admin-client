import { useState, useRef, useEffect, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext';

function Navbar() {
    const [isShow, setIsShow] = useState(false);
    const ref = useRef(null);
    const navigate = useNavigate();

    // Get login state from context
    const { isLogin, username, logout } = useContext(UserContext);

    const COMPANY_NAME = "Admin Panel";
    const NAV_LINKS = [
        { text: "Home", path: "/" },
        { text: "Employee List", path: "/employee-list" },
        { text: username, path: `/admin/${username}` },
    ];
    const LOGO_IMG_1 = require('../assets/906343.png');

    const handleShow = () => {
        setIsShow(!isShow);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!isLogin)
            navigate('/login')
    }, [isLogin, navigate])

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed z-50 w-full flex items-center h-20 bg-black">
            <div className="w-full flex justify-between items-center px-5 sm:px-10">
                {/* logo and name */}
                <Link to="/" className="flex items-center gap-3 outline-none">
                    {/* logo */}
                    <div className="w-10 h-10">
                        <img src={LOGO_IMG_1} alt="thrive" title="thrive" className="w-full h-full rounded-full block" />
                    </div>
                    <span className="hidden lg:block text-gray-100 text-2xl font-semibold uppercase">{COMPANY_NAME}</span>
                </Link>

                {/* navlink */}
                {isLogin && (
                    <div ref={ref}>
                        <div className="lg:hidden text-white" onClick={handleShow}>
                            {isShow ? (
                                <i className='bx bx-x text-3xl font-medium'></i>
                            ) : (
                                <i className='bx bx-menu text-3xl font-medium'></i>
                            )}
                        </div>
                        <div className={`lg:hidden absolute w-3/5 h-screen bg-zinc-900 top-0 left-0 z-50 px-4 py-5 ${isShow ? '-translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                            <div className="w-full flex justify-start items-center gap-2 border-b border-gray-400 pb-5">
                                <div className="w-10 h-10">
                                    <img src={LOGO_IMG_1} alt="thrive" title="thrive" className="w-full h-full rounded-full block dark:hidden" />
                                </div>
                                <span className="text-gray-100 text-2xl font-semibold uppercase">{COMPANY_NAME}</span>
                            </div>
                            <div className="mt-5">
                                <ul className="flex flex-col items-center gap-3">
                                    {NAV_LINKS.map((navlink, index) => (
                                        <li key={index} className="font-medium cursor-pointer text-gray-100">
                                            <NavLink to={navlink.path}>{navlink.text}</NavLink>
                                        </li>
                                    ))}
                                    <li className="font-medium cursor-pointer py-2 px-4 bg-yellow-500 rounded-md text-black hover:bg-yellow-400 text-lg md:text-xl">
                                        <button type="button" onClick={handleLogout}>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <ul className="flex items-center justify-evenly gap-5">
                                {NAV_LINKS.map((navlink, index) => (
                                    <li key={index} className="font-medium cursor-pointer text-white">
                                        <NavLink to={navlink.path}>{navlink.text}</NavLink>
                                    </li>
                                ))}
                                <li className="font-medium cursor-pointer py-2 px-4 bg-yellow-500 rounded-md text-black hover:bg-yellow-400">
                                    <button type="button" onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;