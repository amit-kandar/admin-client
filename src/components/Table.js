import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({ columns, filteredUsers, deleteUser, sortField, sortDirection, handleSort }) => {
    console.log(filteredUsers);

    // Mapping of column names to field names
    const colName = {
        f_id: "Unique Id",
        f_name: "Name",
        f_email: "Email",
        createdAt: "Created Date"
    };

    // Get the sort arrow based on the column and current sorting
    const getSortArrow = (columnName) => {
        const fieldName = Object.keys(colName).find(key => colName[key] === columnName);
        if (sortField === fieldName) {
            return sortDirection === 'asc' ? '↑' : '↓';
        }
        return '';
    };

    // Handle sort click by mapping column name to field name
    const handleSortClick = (columnName) => {
        const fieldName = Object.keys(colName).find(key => colName[key] === columnName);
        if (fieldName) {
            handleSort(fieldName);
        }
    };

    return (
        <table className="w-full table-auto border-collapse border border-gray-800 dark:border-gray-100">
            <thead>
                <tr className='text-gray-700'>
                    {columns.map(columnName => (
                        <th
                            key={columnName}
                            className="border border-gray-800 px-4 py-2 cursor-pointer"
                            onClick={() => {
                                if (Object.values(colName).includes(columnName)) {
                                    handleSortClick(columnName);
                                }
                            }}
                        >
                            {columnName} {getSortArrow(columnName)}
                        </th>
                    ))}
                    <th className="border border-gray-800 px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length + 1} className="text-center py-4">
                            No records found.
                        </td>
                    </tr>
                ) : (
                    filteredUsers.map(user => (
                        <tr key={user.f_id} className='text-gray-700'>
                            {columns.map(columnName => (
                                <td key={columnName} className="border border-gray-800 px-4 py-2">
                                    {columnName === 'Unique Id' && user.f_id}
                                    {columnName === 'Name' && user.f_name}
                                    {columnName === 'Mobile Number' && user.f_mobile}
                                    {columnName === 'Designation' && user.f_designation}
                                    {columnName === 'Course' && user.f_course}
                                    {columnName === 'Email' && user.f_email}
                                    {columnName === 'Gender' && user.f_gender}
                                    {columnName === 'Created Date' && new Date(user.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                    {columnName === 'Image' &&
                                        <img src={user.f_image_url} alt={user.f_name} className='w-10 h-10 rounded' />
                                    }
                                </td>
                            ))}
                            <td className="border border-gray-800 px-4 py-2">
                                <div className='flex'>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded mr-2"
                                        onClick={() => deleteUser(user.f_id)}
                                    >
                                        <i className='bx bx-trash'></i>
                                    </button>

                                    <Link to={`/edit/employee/${user.f_id}`} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded mr-2">
                                        <i className='bx bx-pencil'></i>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))
                )}

            </tbody>
        </table>
    );
};

export default Table;