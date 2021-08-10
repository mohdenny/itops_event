import React, { Fragment } from 'react';

const Landing = () => {
    return (
        <Fragment>
            <div className='grid grid-cols-2 gap-4'>
                <div className='card h-full'>
                    <div className='card-header bg-yellow-200 h-16 text-center py-3.5 text-2xl font-mono rounded-t-xl'>Upcoming</div>
                    <div className='card-body h-full bg-yellow-100 rounded-b-xl '>
                        <div className='card-content p-4 grid grid-flow-row auto-rows-max gap-4'>
                            <div className='p-3 bg-white rounded-lg shadow-lg'>
                                <p className='font-bold text-xl overflow-ellipsis'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                <p className='text-gray-600 text-lg'>Studio 2 Grand </p>
                                <p className='text-gray-400 text-base'>08-10-2021</p>
                            </div>
                            <div className='p-3 bg-white rounded-lg shadow-lg'>
                                <p className='font-bold text-xl overflow-ellipsis'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                <p className='text-gray-600 text-lg'>Studio 2 Grand </p>
                                <p className='text-gray-400 text-base'>08-10-2021</p>
                            </div>
                            <div className='p-3 bg-white rounded-lg shadow-lg'>
                                <p className='font-bold text-xl overflow-ellipsis'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                <p className='text-gray-600 text-lg'>Studio 2 Grand </p>
                                <p className='text-gray-400 text-base'>08-10-2021</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card h-full'>
                    <div className='card-header bg-blue-200 h-16 text-center py-3.5 text-2xl font-mono rounded-t-xl '>Ongoing</div>
                    <div className='card-body h-full bg-blue-100 rounded-b-xl '>
                        <div className='card-content p-4 grid grid-flow-row auto-rows-max gap-4'>
                            <div className='p-3 bg-white rounded-lg shadow-lg'>
                                <p className='font-bold text-xl overflow-ellipsis'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                <p className='text-gray-600 text-lg'>Studio 2 Grand </p>
                                <p className='text-gray-400 text-base'>08-10-2021</p>
                            </div>
                            <div className='p-3 bg-white rounded-lg shadow-lg'>
                                <p className='font-bold text-xl overflow-ellipsis'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                <p className='text-gray-600 text-lg'>Studio 2 Grand </p>
                                <p className='text-gray-400 text-base'>08-10-2021</p>
                            </div>
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