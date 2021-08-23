import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyCalendar = ({ events }) => {
    const localizer = momentLocalizer(moment);
    const filteredEvent = (filter) => {
      return events.filter(event => event.status === filter)
  }

  console.log(events)

    return (
        <div className='max-w-full bg-gray-200 rounded-xl mb-10' style={{ height: '400pt'}}>
          <div className="px-6 py-4 text-center">
            <div className="font-bold text-lg mb-2">Calendar</div>
          </div>
              <Calendar
                events={filteredEvent('upcoming')}
                startAccessor={(events) => { return moment(events.start).toDate() }}
                endAccessor={(events) => { return moment(events.end).toDate() }}
                defaultDate={moment().toDate()}
                localizer={localizer}
                className="bg-gray-100 p-8 rounded-xl"
              />
        </div>
    );
}

export default MyCalendar;