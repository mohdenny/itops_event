import React, { Fragment, useEffect } from 'react';
import { getEventsGuest } from '../../actions/event';
import MyCalendar from '../calendar/MyCalendar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Services from '../services/Services';

const Calendar = ({ event: { events }, getEventsGuest }) => {

    useEffect(() => {
        getEventsGuest();
    }, [getEventsGuest, events])

    return (
        <Fragment>
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-6 px-6 h-screen">
                    <div className="p-4 bg-white rounded-lg">
                        <div className="grid lg:grid-cols-auto md:grid-rows-auto sm:grid-rows-auto">
                            <MyCalendar events={events} />
                        </div>
                    </div>
                </div>
            </div>
            <Services events={events} />
        </Fragment>
    )
} 

Calendar.propTypes = ({
    getEventsGuest: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
});

const mapStateToProps = state => ({
    event: state.event
});


export default connect(mapStateToProps, { getEventsGuest })(Calendar);