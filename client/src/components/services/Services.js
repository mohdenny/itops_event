import React, { useEffect } from 'react';
import moment from 'moment';
import Alert from '../layout/Alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventsGuest, updateStatus } from '../../actions/event';

const Services = ({ event: { events }, getEventsGuest, updateStatus }) => {

    const eventDate = (data, format) => {
        return moment(data).format(format)
    }

    const localDate = (format) => {
        return moment().format(format)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setUpcomingStatus = datas => {
        datas.forEach(data => {
            if(data.status !== 'upcoming' && data.status === ''){
                if( eventDate(data.start, 'd') >= localDate('d') ) {
                    if( eventDate(data.start, 'M') >= localDate('M') ) {
                        if( eventDate(data.start, 'YYYY') >= localDate('YYYY') ) {
                            if( data.items.length > 0 && data.supports.length > 0) {
                                updateStatus(data._id, {status: 'upcoming'})
                                console.clear();
                            } 
                        }
                    }
                } 
            }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setNewStatus = datas => {
        datas.forEach(data => {
            if(data.status !== ''){
                if( eventDate(data.start, 'd') >= localDate('d') ) {
                    if( eventDate(data.start, 'M') >= localDate('M') ) {
                        if( eventDate(data.start, 'YYYY') >= localDate('YYYY') ) {
                            if( data.items.length === 0 || data.supports.length === 0) {
                                updateStatus(data._id, {status: ''})
                                console.clear();
                            }
                        }
                    }
                }
            }
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setOngoingStatus = datas => {
        datas.forEach(data => {
            if(data.status !== 'ongoing' && data.status === 'upcoming' ){
                if( eventDate(data.start, 'd') <= localDate('d') ) {
                    if( eventDate(data.start, 'M') <= localDate('M') ) {
                        if( eventDate(data.start, 'YYYY') <= localDate('YYYY') ) {
                            if( eventDate(data.start, 'H') <= localDate('H') ) {
                                if( eventDate(data.start, 'mm') <= localDate('mm') ) {
                                    if( data.items.length > 0 && data.supports.length > 0) {
                                        updateStatus(data._id, {status: 'ongoing'})
                                        console.clear();
                                    }
                                }
                            }
                        }
                    }
                } 
            }
        })
    }

    useEffect(() => {
        getEventsGuest()
        setNewStatus(events);
        setUpcomingStatus(events);
        setOngoingStatus(events);
        console.log('running');
    },[getEventsGuest, setNewStatus, setUpcomingStatus, setOngoingStatus, events])

    return <Alert />;

}

Services.propTypes = {
    getEventsGuest: PropTypes.func.isRequired,
    updateStatus: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    event: state.event
})

export default connect(mapStateToProps, { getEventsGuest, updateStatus } )(Services);