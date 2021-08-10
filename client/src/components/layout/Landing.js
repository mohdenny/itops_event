import React, { Fragment } from 'react';

const Landing = () => {
    return (
        <Fragment>
            <div className='bg-main p-10 bg-gradient-to-r from-blue-400 to-gray-300 w-full h-screen'>
                <div className='card h-full'>
                    <div className='card-header bg-yellow-100 rounded-lg'>Upcoming</div>
                    <div className='card-body h-full rounded-md'>
                        <div className='card-content bg-white grid grid-rows-3 grid-flow-col'>
                            <div className='p-3 bg-white rounded-lg shadow-lg'>
                                <p className='font-bold text-xl overflow-ellipsis'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                <p className='text-gray-600 text-lg'>Studio 2 Grand </p>
                                <p className='text-gray-400 text-base'>08-10-2021</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
} 

export default Landing;