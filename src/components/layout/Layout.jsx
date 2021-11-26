import React from 'react'

import Routers from '../Routers'
import TopNav from '../topnav/TopNav'
import SideBar from '../sidebar/SideBar'

import './styles.scss'

function Layout() {
    return (
        <>
            <div className='layout'>
                <SideBar />
                <div className='layout__content'>
                    <TopNav />
                    <div className='layout__content-main'>
                        <Routers />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout
