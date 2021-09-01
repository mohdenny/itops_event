import React, { Fragment } from 'react';
import MyCalendar from '../calendar/MyCalendar';

const Landing = () => {
    return (
        <Fragment>
            <div className="max-w-7xl mx-auto py-6 px-6 h-screen">
                <MyCalendar />
            </div>
        </Fragment>
    )
} 

export default Landing;