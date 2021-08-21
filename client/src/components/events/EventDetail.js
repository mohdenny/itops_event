import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventById } from '../../actions/event'; 

const EventDetail = ({ event: { event }, getEventById, match }) => {
    useEffect(() => {
        getEventById(match.params.id)
    }, [getEventById])

    return (
        <Fragment>
            <p>{ event && event.title }</p>
        </Fragment>
    )
}

EventDetail.propTypes = {
    getEventById: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    event: state.event
})

export default connect(mapStateToProps, { getEventById })(EventDetail);