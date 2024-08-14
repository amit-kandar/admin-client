import React from 'react';

const Pagination = ({ currentPage, usersPerPage, users, paginate, nextPage, prevPage, goToFirstPage, goToLastPage }) => {
    const showingText = `Showing ${Math.min((currentPage - 1) * usersPerPage + 1, users.length)} to ${Math.min(currentPage * usersPerPage, users.length)} of ${users.length} entries`;

    return (
        <div className='w-full flex flex-col justify-between items-center sm:flex-row'>
            <div className='text-gray-700'>{showingText}</div>
            <ul className="flex list-none justify-end py-4">
                <li className="mx-1">
                    <button
                        className="px-2 py-1 rounded bg-gray-200"
                        onClick={() => goToFirstPage()}
                    >
                        <i className='bx bx-chevrons-left text-2xl font-medium' ></i>
                    </button>
                </li>
                <li className="mx-1">
                    <button
                        className="px-2 py-1 rounded bg-gray-200"
                        onClick={() => prevPage()}
                    >
                        <i className='bx bx-chevron-left text-2xl font-medium'></i>
                    </button>
                </li>
                {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(number => (
                    <li key={number} className="mx-1">
                        <button
                            className={`px-4 py-2 rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => paginate(number + 1)}
                        >
                            {number + 1}
                        </button>
                    </li>
                ))}
                <li className="mx-1">
                    <button
                        className="px-2 py-1 rounded bg-gray-200"
                        onClick={() => nextPage()}
                    >
                        <i className='bx bx-chevron-right text-2xl font-medium'></i>
                    </button>
                </li>
                <li className="mx-1">
                    <button
                        className="px-2 py-1 rounded bg-gray-200"
                        onClick={() => goToLastPage()}
                    >
                        <i className='bx bx-chevrons-right text-2xl font-medium' ></i>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;