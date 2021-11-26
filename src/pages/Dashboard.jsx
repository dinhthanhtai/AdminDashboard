import React from 'react'
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom';

import statusCards from '../assets/JsonData/status-card-data.json'
import Badge from '../components/badge/Badge';
import StatusCard from '../components/status-card/StatusCard'
import Table from '../components/table/Table';
import { chartOptions, topCustomers, latestOrders, orderStatus } from './../assets/mockdata/mock-charts';

const renderCustomerHead = (item, index) => (
    <th key={index}>
        {item}
    </th>
)

const renderCustomerBody = (item, index) => (
    <tr key={index}>
        <td>{item.username}</td>
        <td>{item.order}</td>
        <td>{item.price}</td>
    </tr>
)

const renderOrderHead = (item, index) => (
    <th key={index}>
        {item}
    </th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.user}</td>
        <td>{item.date}</td>
        <td>{item.price}</td>
        <td>
            <Badge type={orderStatus[item.status]} content={item.status} />
        </td>
    </tr>
)

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
                        <Chart
                            options={chartOptions.options}
                            series={chartOptions.series}
                            type='line'
                            height='100%'
                        />
                    </div>
                </div>
                <div className='col-4'>
                    <div className='card'>
                        <div className='card__header'>
                            <h3>Top customers</h3>
                        </div>
                        <div className='card__body'>
                            <Table 
                                headData={topCustomers.head}
                                renderHead={renderCustomerHead}
                                bodyData={topCustomers.body}
                                renderBody={renderCustomerBody}
                            />
                        </div>
                        <div className='card__footer'>
                            <Link to='/'>
                                View All
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='col-8'>
                    <div className='card full-height'>
                        <div className='card__header'>
                            <h3>Latest order</h3>
                        </div>
                        <div className='card__body'>
                            <Table 
                                headData={latestOrders.head}
                                renderHead={renderOrderHead}
                                bodyData={latestOrders.body}
                                renderBody={renderOrderBody}
                            />
                        </div>
                        <div className='card__footer'>
                            <Link to='/' >
                                View All
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
