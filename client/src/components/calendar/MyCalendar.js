import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEventsGuest } from '../../actions/event';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyCalendar = ({ event: { events }, getEventsGuest }) => {
    const localizer = momentLocalizer(moment);

    useEffect(() => {
      getEventsGuest()
    }, [getEventsGuest, events])

    return (
        <div className='max-w-full bg-gray-300 rounded-xl mb-10' style={{ height: '400pt'}}>
          <div className="px-6 py-4 text-center">
            <div className="font-bold text-lg mb-2">Calendar</div>
          </div>
              <Calendar
                events={events.filter(event => event.status === '')}
                startAccessor={(events) => { return moment(events.start).toDate() }}
                endAccessor={(events) => { return moment(events.end).toDate() }}
                defaultDate={moment().toDate()}
                localizer={localizer}
                className="bg-gray-200 p-8 rounded-xl"
              />
        </div>
    );
}

Calendar.propTypes = {
  getEventsGuest: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  event: state.event
})

export default connect(mapStateToProps, { getEventsGuest })(MyCalendar);