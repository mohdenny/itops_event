import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEvents, getEventsGuest } from '../../actions/event';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyCalendar = ({ event: { events }, getEventsGuest, getEvents, onlyview }) => {
    const localizer = momentLocalizer(moment);

    useEffect(() => {
      if(onlyview) {
        getEventsGuest();
      }

      getEvents();

    }, [onlyview, getEventsGuest, getEvents])

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
  getEvents: PropTypes.func.isRequired,
  getEventsGuest: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  event: state.event
})

export default connect(mapStateToProps, { getEventsGuest, getEvents })(MyCalendar);