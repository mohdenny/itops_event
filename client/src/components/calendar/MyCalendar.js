import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyCalendar = ({ events }) => {
    const localizer = momentLocalizer(moment);

    return (
        <div className='max-w-full bg-gray-300 rounded-xl overflow-auto'>
          <div className="px-6 py-4 text-center">
            <div className="font-bold text-lg mb-2">Calendar</div>
          </div>
              <Calendar
                events={events.filter(event => event.status === 'upcoming' || event.status === 'ongoing')}
                startAccessor={(events) => { return moment(events.start).toDate() }}
                endAccessor={(events) => { return moment(events.end).toDate() }}
                defaultDate={moment().toDate()}
                localizer={localizer}
                className="bg-gray-200 p-4"
                style={{ height: '500px' }} 
              />
        </div>
    );
}

export default MyCalendar;