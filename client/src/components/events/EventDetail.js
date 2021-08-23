import React, { Fragment, useEffect } from 'react';
import Header from '../layout/Header';
import ItemList from '../items/ItemList';
import ItemForm from '../items/ItemForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventById } from '../../actions/event'; 
import moment from 'moment';

const EventDetail = ({ event: { event }, getEventById, match }) => {
    useEffect(() => {
        getEventById(match.params.id);
    }, [getEventById, match.params.id])

    return (
        <Fragment>
            <Header text={'Event Detail'} />

            <main>
                <div className="w-full max-w-full m-auto mt-4">
                    <div className="pt-3 border rounded-lg ">
                        <div className="text-center font-bold text-lg leading-7 text-gray-900 sm:text-2xl sm:truncate mb-4">
                            { event && event.title }
                        </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-gray-50">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <p className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight mb-3">
                                    { event && event.description }
                                </p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="start">
                                    Schedule
                                </label>
                                <p className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight mb-3">
                                    { `${event && moment(event.start).format("lll")} - ${event && moment(event.end).format("lll")}` }
                                </p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="location">
                                    Location
                                </label>
                                <p className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight mb-3">
                                    { event && event.location }
                                </p>
                            </div>
                        </div>

                        <div className="border p-4 mb-4 bg-white">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="item">
                                    Item
                                </label>
                                <div className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight mb-3">
                                    { event && event.items && event.items.length > 0 ? <ItemList items={event.items} /> : 'no items' }
                                </div>
                                <div className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight mb-3">
                                    <ItemForm id={match.params.id} />
                                </div>
                        </div>

                        <div className="border p-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="support">
                                Support
                            </label>
                        </div>
                    </div>
                </div>
            </main>
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