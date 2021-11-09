import { useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStatus } from '../../actions/event';

const Services = ({ events , updateStatus }) => {
    const eventDate = (data, format) => {
        return moment(data).format(format)
    }

    const localDate = (format) => {
        return moment().format(format)
    }

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setNewStatus = datas => {
        datas.forEach(data => {
            if(data.status === '' || data.status === 'upcoming'){
                if( parseInt(eventDate(data.start, 'D')) >= parseInt(localDate('D'))) {
                    if( parseInt(eventDate(data.start, 'M')) >= parseInt(localDate('M')) ) {
                        if( parseInt(eventDate(data.start, 'YYYY')) >= parseInt(localDate('YYYY')) ) {
                            if( data.items.length === 0 || data.supports.length === 0) {
                                updateStatus(data._id, {status: 'new'})
                            }
                        }
                    }
                }
            }
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setUpcomingStatus = datas => {
        datas.forEach(data => {
            if(data.status !== 'upcoming' && data.status === 'new'){
                if( parseInt(eventDate(data.start, 'D')) >= parseInt(localDate('D'))) {
                    if( parseInt(eventDate(data.start, 'M')) >= parseInt(localDate('M')) ) {
                        if( parseInt(eventDate(data.start, 'YYYY')) >= parseInt(localDate('YYYY')) ) {
                            if( data.items.length > 0 && data.supports.length > 0) {
                                updateStatus(data._id, {status: 'upcoming'})
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
                if( parseInt(eventDate(data.start, 'D')) <= parseInt(localDate('D')) ) {
                    if( parseInt(eventDate(data.start, 'M')) <= parseInt(localDate('M')) ) {
                        if( parseInt(eventDate(data.start, 'YYYY')) <= parseInt(localDate('YYYY')) ) {
                            if( parseInt(eventDate(data.start, 'H')) <= parseInt(localDate('H')) ) {
                                if( parseInt(eventDate(data.start, 'mm')) <= parseInt(localDate('mm')) ) {
                                    if( data.items.length > 0 && data.supports.length > 0) {
                                        updateStatus(data._id, {status: 'ongoing'})
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
        setNewStatus(events);
        setUpcomingStatus(events);
        setOngoingStatus(events);
    },[setNewStatus, setUpcomingStatus, setOngoingStatus, events, updateStatus])

    return null

}

Services.propTypes = {
    updateStatus: PropTypes.func.isRequired
}

export default connect(null, { updateStatus } )(Services);