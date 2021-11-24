import React from 'react'

import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';


const Routers = () => {
    return (
        <>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/customer' element={<Customer/>} />
        </>
    )
}

export default Routers
