import React, { Fragment } from 'react';
import CardItem from './CardItem';

const CardEvent = ({ events }) => {
    const filteredEvent = (filter) => {
        return events.filter(event => event.status === filter)
    }

    return (
        <Fragment>
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="max-w-full overflow-hidden bg-yellow-200 rounded-xl">
                    <div className="px-6 py-4 text-center">
                        <div className="font-bold text-lg mb-2">New</div>
                    </div>
                    { filteredEvent('new').length > 0 ? (
                        <div className="bg-yellow-100 px-4 py-4 overflow-auto max-h-64">
                            <CardItem events={events} sortText='new' />
                        </div>
                    ) : (
                        <div className="bg-yellow-100 px-4 py-4 h-full">
                            <p className="self-center text-center italic">Not available</p>  
                        </div>
                    )}
                </div>

                <div className="max-w-full overflow-hidden bg-green-200 rounded-xl">
                    <div className="px-6 py-4 text-center">
                        <div className="font-bold text-lg mb-2">Upcoming</div>
                    </div>
                    { filteredEvent('upcoming').length > 0 ? (
                        <div className="bg-green-100 px-4 py-4 overflow-auto max-h-64">
                            <CardItem events={events} sortText='upcoming' />
                        </div>
                    ) : (
                        <div className="bg-green-100 px-4 py-4 h-full">
                            <p className="self-center text-center italic">Not available</p>  
                        </div>
                    )}
                </div>

                <div className="max-w-full overflow-hidden bg-blue-200 rounded-xl">
                    <div className="px-6 py-4 text-center">
                        <div className="font-bold text-lg mb-2">Ongoing</div>
                    </div>
                    { filteredEvent('ongoing').length > 0 ? (
                        <div className="bg-blue-100 px-4 py-4 overflow-auto max-h-64">
                            <CardItem events={events} sortText='ongoing' />
                        </div>
                    ) : (
                        <div className="bg-blue-100 px-4 py-4 h-full">
                            <p className="self-center text-center italic">Not available</p>  
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default CardEvent;