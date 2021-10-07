import React, { Fragment, useEffect, useState } from 'react';
import Header from '../layout/Header';
import ItemList from '../items/ItemList';
import ItemForm from '../items/ItemForm';
import SupportList from '../supports/SupportList';
import SupportForm from '../supports/SupportForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventById } from '../../actions/event'; 
import Alert from '../layout/Alert';
import moment from 'moment';

const EventDetail = ({ event: { event }, getEventById, match }) => {
    const [displayItemsInputs, toggleItemsInputs] = useState(false);
    const [displaySupportsInputs, toggleSupportsInputs] = useState(false);

    useEffect(() => {
        getEventById(match.params.id);
    }, [getEventById, match.params.id, event])

    return (
        <Fragment>
            <Header text={'Event Detail'} />

            <main>
                <div className="w-full max-w-full m-auto mt-4">
                    <div className="pt-3 border rounded-lg bg-white">
                        <div className="text-center font-bold text-lg leading-7 text-gray-900 sm:text-2xl sm:truncate mb-4">
                            { event && event.title }
                        </div>
                    </div>

                    <div className="p-8 border rounded-lg bg-white">
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
                                    { `${event && moment(event.start).format("D-MM-YYYY, H:mm")} - ${event && moment(event.end).format("D-MM-YYYY, H:mm")}` }
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
                            <div className="mb-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="location">
                                        Created
                                    </label>
                                    <p className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight mb-3">
                                        { event && moment(event.date).format("D-MM-YYYY, H:mm") }
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="location">
                                        Edited
                                    </label>
                                    <p className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight mb-3">
                                        { event && event.edited ? moment(event.edited).format("D-MM-YYYY, H:mm") : '-' }
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border p-4 mb-4 ">
                            <Alert />
                            <div className='grid grid-cols-2 gap-4'>
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="item">
                                    Item
                                </label>
                                {   
                                    event && event.status !== 'done' && event.status !=='ongoing' &&
                                        (
                                            <button onClick={() => toggleItemsInputs(!displayItemsInputs)} type="button" className="col-end-13 ml-2 p-1 bg-yellow-500 rounded-md text-white hover:bg-yellow-800 hover:text-gray-200 min-w-min">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        )
                                }
                            </div>
                            <div className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight mb-3">
                                { 
                                    event && event.items && event.items.length > 0 ? 
                                            <ItemList items={event.items} /> 
                                        : 
                                            <p className="text-center italic">No items</p> 
                                }
                            </div>
                            {
                                displayItemsInputs &&
                                (
                                    <div className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight mb-3">
                                        <ItemForm id={match.params.id} />
                                    </div>
                                )
                            }
                        </div>

                        <div className="border p-4 mb-4">
                            <div className='grid grid-cols-2 gap-4'>
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="support">
                                    Support
                                </label>
                                {   
                                    event && event.status !== 'done' && event.status !=='ongoing' &&
                                        (
                                            <button onClick={() => toggleSupportsInputs(!displaySupportsInputs)} type="button" className="col-end-13 ml-2 p-1 bg-yellow-500 rounded-md text-white hover:bg-yellow-800 hover:text-gray-200 min-w-min">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        )
                                }
                            </div>
                            <div className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight mb-3">
                                { 
                                    event && event.supports && event.supports.length > 0 ? 
                                            <SupportList supports={event.supports} /> 
                                        : 
                                            <p className="text-center italic">No supports</p> 
                                }
                            </div>
                                {
                                    displaySupportsInputs &&
                                        (
                                            <div className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight mb-3">
                                                <SupportForm id={match.params.id} />
                                            </div>
                                        )
                                }
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