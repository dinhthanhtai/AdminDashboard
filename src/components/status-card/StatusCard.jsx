import React from 'react'

import './styles.scss';

const StatusCard = (props) => {
    return (
        <div className='statusCard'>
            <div className='statusCard__icon'>
                <i className={props.icon} />
            </div>
            <div className='statusCard__info'>
                <h4> {props.count} </h4>
                <span> {props.title} </span>
            </div>
        </div>
    )
}

export default StatusCard
