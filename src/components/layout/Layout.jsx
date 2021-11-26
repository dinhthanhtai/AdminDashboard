import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'  

import Routers from '../Routers'
import TopNav from '../topnav/TopNav'
import SideBar from '../sidebar/SideBar'

import './styles.scss';

import ThemeAction from '../../redux/actions/ThemeAction';

function Layout() {

    const themeReducer = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode')
        const colorClass = localStorage.getItem('colorMode')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))

    }, [dispatch])

    return (
        <>
            <div className={`layout ${themeReducer?.mode} ${themeReducer?.color}`}>
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
