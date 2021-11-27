import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import Table from '../components/table/Table'
import customerList from '../assets/JsonData/customers-list.json';

const customerTableHead = [
    '',
    'name',
    'email',
    'phone',
    'total orders',
    'total spend',
    'location'
]

const renderHead = (item, index) => <th key={index}> {item} </th>

const renderBody = (item, index) => (
    <tr key='index' key={index}>
        <td> {item.id} </td>
        <td> {item.name} </td>
        <td> {item.email} </td>
        <td> {item.phone} </td>
        <td> {item.total_orders} </td>
        <td> {item.total_spend} </td>
        <td> {item.location} </td>
    </tr>
)

const Customer = () => {   
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState(customerList);

    useEffect(() => {
        const valueSearch = searchParams.get('filter');
        if (valueSearch !== null) {
            setTimeout(() => {
                const newArr = state.filter(item => item.name.includes(valueSearch));
                setState(newArr);
            }, 1000)
        }

        return function cleanup() {
            setState(customerList);
        }

    }, [searchParams.get('filter')])

    return (
        <div>
            <h2 className='page-header'>
                Customer
            </h2>
            <div className='row'>
                <div className='col-12'>
                    <div className='card'>
                        <div className='card__body'>
                            <Table 
                                limit='10'
                                headData={customerTableHead}
                                renderHead={renderHead}
                                bodyData={state}
                                renderBody={renderBody}
                            /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customer
