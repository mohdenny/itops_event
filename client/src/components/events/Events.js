import React, { Fragment, useEffect } from 'react';
import Header from '../layout/Header';
import EventItem from './EventItem';
import Alert from '../layout/Alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/event';

const Events = ({ getEvents, event: { events } }) => {
    useEffect(() => {
        getEvents();
    }, [getEvents])

    return (
        <Fragment>
            <Header text={'Manage Event'} />

            <main>
                <div className="max-w-7xl mx-auto py-6">
                    <div className="px-4 py-2 border rounded-lg h-full">
                        <div className="text-center font-bold text-lg leading-7 text-gray-900 sm:text-2xl sm:truncate mb-4">
                            List of Events
                        </div>
                        <Alert />
                        <div className="mb-4">
                            { events && events.length > 0 ? 
                                (<EventItem events={events} />) :
                                <div className="flex justify-center bg-gray-100 px-4 py-4 h-96">
                                    <p className="self-center text-center italic">Not available</p> 
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    )
}

Events.propTypes = {
    getEvents: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    event: state.event
});
  
export default connect(mapStateToProps, { getEvents })(Events);