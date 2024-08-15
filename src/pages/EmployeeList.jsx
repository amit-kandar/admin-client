import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(5);
    const [sortField, setSortField] = useState('f_id');
    const [sortDirection, setSortDirection] = useState('asc');

    const url = 'http://localhost:8080/api/v1/employee'

    const columns = [
        "Unique Id",
        "Image",
        "Name",
        "Email",
        "Gender",
        "Mobile Number",
        "Designation",
        "Course",
        "Created Date",
    ];

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get(url, {
                params: {
                    page: currentPage,
                    limit: usersPerPage,
                    search: searchTerm,
                    sortField: sortField,
                    sortDirection: sortDirection
                }
            });

            setUsers(response.data.data.employees);
            setTotalPages(response.data.data.totalPages);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [currentPage, usersPerPage, searchTerm, sortField, sortDirection]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const deleteUser = async (f_id) => {
        try {
            // Show confirmation dialog
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "Do you really want to delete this user? This action cannot be undone.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                // Remove user from local state immediately for a better user experience
                const updatedUsers = users.filter(user => user.f_id !== f_id);
                setUsers(updatedUsers);

                // Send DELETE request to the server
                await axios.delete(`${url}/${f_id}`);

                // Show success message
                Swal.fire({
                    title: 'Deleted!',
                    text: 'The user has been deleted successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Show a message if the deletion is canceled
                Swal.fire({
                    title: 'Cancelled',
                    text: 'The user is safe!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            // Handle any errors that occur during the delete request
            Swal.fire({
                title: 'Failed!',
                text: 'There was an error deleting the user. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error('Error deleting user:', error);
        }
    };


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    // const indexOfLastUser = currentPage * usersPerPage;
    // const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const filteredUsers = users.filter(user =>
        user.f_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.f_email.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, usersPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };

    const handleSort = (field) => {
        const newSortDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(newSortDirection);
        fetchUsers();
        setCurrentPage(1);
    };

    return (
        <div className='pl-5 pr-1'>
            <div className='min-h-screen'>
                <div className="container mx-auto">
                    <h1 className='text-2xl font-semibold my-5'>Employee List</h1>
                    <div className="flex flex-col gap-3 md:flex-row items-start justify-between md:items-center mb-4">
                        <SearchBar handleSearch={handleSearch} setUsersPerPage={setUsersPerPage} usersPerPage={usersPerPage} />
                        <div className="flex items-center">
                            <Link to="/create-employee" className="font-medium cursor-pointer py-2 px-4 bg-yellow-500 rounded-md text-black hover:bg-yellow-400 text-base">Create Employee</Link>
                        </div>
                    </div>
                    <div className='w-full overflow-x-scroll xl:overflow-hidden'>
                        <Table
                            columns={columns}
                            filteredUsers={filteredUsers}
                            deleteUser={deleteUser}
                            sortField={sortField}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                        />
                    </div>

                    <Pagination currentPage={currentPage} usersPerPage={usersPerPage} users={users} paginate={paginate} nextPage={nextPage} prevPage={prevPage} goToFirstPage={goToFirstPage} goToLastPage={goToLastPage} />
                </div>
            </div>
        </div>

    );
};

export default EmployeeList;