import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'  

import { Outlet } from 'react-router-dom'

import Routers from '../Routers'
import TopNav from '../topnav/TopNav'
import SideBar from '../sidebar/SideBar'

import './styles.scss';

import { setMode, setColor } from '../../features/theme/themeSlice'

function Layout({ children }) {
    const themeReducer = useSelector(state => state.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode')
        const colorClass = localStorage.getItem('colorMode')

        dispatch(setMode(themeClass))

        dispatch(setColor(colorClass))

    }, [dispatch])

    return (
        <>  
            <div className={`layout ${themeReducer?.mode} ${themeReducer?.color}`}>
                <SideBar />
                <div className='layout__content'>
                    <TopNav />
                    <div className='layout__content-main'>
                        <Outlet/>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout
