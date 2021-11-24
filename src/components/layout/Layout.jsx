import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../../pages/Dashboard'
import Customer from '../../pages/Customer'

import Routers from '../Routers'
import SideBar from '../sidebar/SideBar'

function Layout() {
    return (
        <>
            <div className='layout'>
                <SideBar />
                <div className='layout__content'>
                    <div className='layout__content-main'>
                        <Routes>    
                            <Route path='/' element={<Dashboard/>} />
                            <Route path='/customer' element={<Customer/>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout
