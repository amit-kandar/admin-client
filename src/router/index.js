import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import EmployeeList from '../pages/EmployeeList';
import CreateEmployee from '../pages/CreateEmployee';
import EditEmployee from '../pages/EditEmployee';

function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='/employee-list' element={<EmployeeList />} />
            <Route path='/create-employee' element={<CreateEmployee />} />
            <Route path='/edit/employee/:f_id' element={<EditEmployee />} />
        </Routes>
    );
}

export default AppRouter;
