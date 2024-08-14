import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
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

    const url = 'http://localhost:8080/api/v1/employee/'

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

            console.log(response.data.data);

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
        const updatedUsers = users.filter(user => user.id !== f_id);
        setUsers(updatedUsers);
        await axios.delete(`${url}/:${f_id}`)
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