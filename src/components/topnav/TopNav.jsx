import React, { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 

import Dropdown from './../dropdown/Dropdown';
import './styles.scss';

import notifications from './../../assets/JsonData/notification.json';

import user_image from '../../assets/images/cutaine.jpg';

import user_menu from '../../assets/JsonData/user_menus.json';
import ThemeMenu from '../thememenu/ThemeMenu';

const curr_user = {
    display_name: 'Thanh Tai',
    image: user_image
}

const renderNotificationItem = (item, index) => (
    <Link to='/' key={index}>
        <div className='notification-item'>
            <i className={item.icon}></i>
            <span> {item.content} </span>
        </div>
    </Link>
)


const renderUserToggle = (user) => (
    <div className='topNav__right-user'>
        <div className='topNav__right-user__image'>
            <img src={user.image} alt='' />
        </div>
        <div className='topNav__right-user__name'>
            {user.display_name}
        </div>
    </div>
)

const renderUserMenu = (item, index) => (
    <Link to='/' key={index}>
        <div className='notification-item'>
            <i className={item.icon}></i>
            <span> {item.content} </span>
        </div>
    </Link>
)

const TopNav = () => {
    const location = useLocation();

    let [searchParams, setSearchParams] = useSearchParams();
    const handleSearch = (event) => {
        let filter = event.target.value;
        if(filter) {
            setSearchParams({filter});
        } else {
            setSearchParams({});
        }
    }

    return (
        <div className='topNav'>
            <div className='topNav__search'>
            {
                location.pathname?.slice(1) !== '' && (
                    <>
                        <input onChange={event => handleSearch(event)}  type='text' placeholder='Search here ...' />
                        <i className='bx bx-search'></i>
                    </>
                )
            }
            </div>
            <div className='topNav__right'>
                <div className='topNav__right-item'>
                    <Dropdown 
                        customToggle={() => renderUserToggle(curr_user)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}

                    />
                </div>
                <div className='topNav__right-item'>
                    <Dropdown 
                        icon='bx bx-bell'
                        badge='12'
                        contentData={notifications}
                        renderItems={(item, index) => renderNotificationItem(item, index)}
                        renderFooter={() => <Link to='/'> View All </Link>}
                    />
                </div>
                <div className='topNav__right-item'>
                    <ThemeMenu
                    />
                </div>
            </div>
        </div>
    )
}

export default TopNav
