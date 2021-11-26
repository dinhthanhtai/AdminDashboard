import React from 'react'
import Chart from 'react-apexcharts'

import statusCards from '../assets/JsonData/status-card-data.json'
import StatusCard from '../components/status-card/StatusCard'
import { chartOptions, topCustomers } from './../assets/mocdata/mock-charts.js';

const Dashboard = () => {
    return (
        <div>
            <h2 className='page-header'> Dashboard </h2>
            <div className='row'>
                <div className="col-6">
                    <div className="row">
                        {
                            statusCards.map((item, index) => (
                                <div className='col-6' key={index}>
                                    <StatusCard
                                        count={item.count}
                                        title={item.title}
                                        icon={item.icon}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='col-6'>
                    <div className='card full-height'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
