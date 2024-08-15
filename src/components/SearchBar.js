import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ handleSearch, usersPerPage, setUsersPerPage }) => {
    const [isShow, setIsShow] = useState(false);
    const users_on_page = [5, 10, 20, 50, 100];
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleShow = () => {
        setIsShow(!isShow);
    };

    const handleSelect = (value) => {
        return () => {
            setUsersPerPage(value);
            setIsShow(false);
        };
    };

    return (
        <div className='flex flex-col items-start sm:flex-row gap-2'>
            <div className='flex gap-2'>
                <div className='relative' ref={dropdownRef}>
                    <div className='py-2 px-4 w-20 sm:w-28 flex justify-between items-center border border-gray-500' onClick={handleShow}>
                        {usersPerPage}
                        {
                            isShow ? <i className='bx bx-chevron-down cursor-pointer'></i> : <i className='bx bx-chevron-up cursor-pointer'></i>
                        }
                    </div>
                    <div className={`absolute left-0 mt-2 w-20 sm:w-28 flex flex-col items-center bg-white border border-gray-300 rounded-lg shadow-lg z-10 px-4 py-2 space-y-3 ${isShow ? 'block' : 'hidden'}`}>
                        {
                            users_on_page.map((item, index) => <span key={index} className='px-6 py-1 rounded-md cursor-pointer text-black hover:bg-gray-200 duration-200 hover:scale-125' onClick={handleSelect(item)}>{item}</span>)
                        }
                    </div>
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-400 rounded px-2 py-2 sm:px-4 mr-2 outline-none"
                    onChange={handleSearch}
                />
            </div>
        </div>
    );
};

export default SearchBar;