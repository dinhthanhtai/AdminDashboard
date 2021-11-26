import React from 'react'

import './styles.scss';

const Table = (props) => {
    const { headData, renderBody, renderHead, bodyData} = props;


    return (
        <div>
            <div className='table-wrapper'>
                <table>
                    {
                        headData && renderHead && (
                            <thead>
                                <tr>
                                    {
                                        headData.map((item, index) => renderHead(item, index))
                                    }
                                </tr>
                            </thead>
                        ) 
                    }
                    {
                        bodyData && renderBody && (
                            <tbody>
                                {
                                    bodyData.map((item, index) => renderBody(item, index))
                                }
                            </tbody>
                        )
                    }
                </table>
            </div>
        </div>
    )
}

export default Table
