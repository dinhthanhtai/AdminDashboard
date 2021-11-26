import React from 'react'

import { Route, Routes } from 'react-router-dom';
import Customer from '../pages/Customer';
import Dashboard from '../pages/Dashboard';


const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/customers' element={<Customer/>} />
        </Routes>
    )
}

export default Routers
