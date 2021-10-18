import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyCalendar = ({ events }) => {
    const localizer = momentLocalizer(moment);

    return (
        <div className='max-w-full bg-red-300 overflow-auto rounded-xl' style={{ maxHeight: '700px' }} >
          <div className="px-6 py-4 text-center">
            <div className="font-bold text-lg mb-2">Calendar</div>
          </div>
            <Calendar
              events={events.filter(event => event.status === 'upcoming' || event.status === 'ongoing')}
              startAccessor={(events) => { return moment(events.start).toDate() }}
              endAccessor={(events) => { return moment(events.end).toDate() }}
              defaultDate={moment().toDate()}
              localizer={localizer}
              className="bg-red-100 p-4"
              style={{ height: '600px' }} 
            />
        </div>
    );
}

export default MyCalendar;