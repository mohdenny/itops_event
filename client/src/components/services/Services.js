import { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStatus } from '../../actions/event';

const Services = ( props , updateStatus ) => {
    const [id, setId] = useState();
    const [status, setStatus] = useState();

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
                                // updateStatus(data._id, {status: 'upcoming'})
                                setId(data._id);
                                setStatus({status: 'upcoming'});
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
                                // updateStatus(data._id, {status: ''})
                                setId(data._id);
                                setStatus({status: ''});
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
                                        // updateStatus(data._id, {status: 'ongoing'})
                                        setId(data._id);
                                        setStatus({status: 'ongoing'});
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
        updateStatus(id, status);
        setNewStatus(props.events);
        setUpcomingStatus(props.events);
        setOngoingStatus(props.events);
    },[setNewStatus, setUpcomingStatus, setOngoingStatus, props.events, id, status, updateStatus])

    return null

}

Services.propTypes = {
    updateStatus: PropTypes.func.isRequired
}

export default connect(null, { updateStatus } )(Services);