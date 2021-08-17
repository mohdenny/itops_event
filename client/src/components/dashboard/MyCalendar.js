import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyCalendar = ({ events }) => {
    const localizer = momentLocalizer(moment);
    const { start, end } = events;

    console.log(start)

    return (
        <div className='border p-8 rounded-xl mb-4' style={{ height: '500pt'}}>
          <Calendar
            events={events}
            startAccessor={moment(start).toDate()}
            endAccessor={moment(end).toDate()}
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
        </div>
    );
}

export default MyCalendar;