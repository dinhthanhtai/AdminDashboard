import React, { useState, useEffect } from 'react'

import './styles.scss';

const Table = (props) => {
    const { headData, renderBody, renderHead, bodyData, limit} = props;

    const [dataShow, setDataShow] = useState([]);
    const [currPage, setCurrPage] = useState(0);

    let pages = 1

    let range = [];

    if (limit !== undefined) {
        let page = Math.floor(bodyData.length / +limit);
        pages = bodyData.length % +limit === 0 ? page : page + 1;
        range = [...Array(pages).keys()]
    }

    useEffect(() => {
        const initDataShow = limit && bodyData ? bodyData.slice(0, +limit) : bodyData;
        setDataShow(initDataShow)
    }, [bodyData])

    const handleChangePage = (page) => {
        const start = +limit * page;
        const end = start + (+limit);
        return () => {
            setDataShow(bodyData.slice(start, end));
            setCurrPage(page);
        }
    }

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
                                    dataShow.map((item, index) => renderBody(item, index))
                                }
                            </tbody>
                        )
                    }
                </table>
            </div>
            {
                pages > 1 && (
                    <div className='table__pagination'>
                        {
                            range.map((item, index) => (
                                <div 
                                    onClick={handleChangePage(index)} 
                                    className={`table__pagination-item ${currPage === index && 'active'}`} 
                                    key={index}> 
                                    {item + 1}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Table
