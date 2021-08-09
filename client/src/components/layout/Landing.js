import React, { Fragment } from 'react';

const Landing = () => {
    return (
        <Fragment>
            <div className='p-10 bg-gradient-to-r from-blue-400 to-gray-300 w-full h-screen'>
                <div className='grid grid-cols-2 gap-4 h-full'>
                    <div className='p-2 bg-yellow-200 h-full grid grid-rows-6 grid-flow-col gap-4 rounded-xl'>
                        <div className='text-center text-3xl font-mono h-10'><h1>Upcoming</h1></div>
                        <div className='bg-white rounded-xl'>2</div>
                        <div className='bg-white rounded-xl'>3</div>
                        <div className='bg-white rounded-xl'>4</div>
                        <div className='bg-white rounded-xl'>5</div>
                        <div className='bg-white rounded-xl'>6</div>
                    </div>
                    <div className='bg-green-200 h-full rounded-xl'>
                    
                    </div>
                </div>
            </div>
        </Fragment>
    )
} 

export default Landing;