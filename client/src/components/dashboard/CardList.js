import React, { Fragment } from 'react';
import moment from 'moment';

const Table = ({ events }) => {
    const renderedListUpcoming = events
        .sort((a, b) => a.start.localeCompare(b.start))
            .filter(event => event.status === "upcoming")
                .map(filteredEvent => {
                    return (
                        <div key={filteredEvent._id || Math.random()} className="bg-white px-4 py-2 mb-2 rounded-xl shadow-md grid grid-cols-2 gap-4 h-full">
                            <p className="inline-block text-lg col-span-full">{filteredEvent.title}</p>
                            <p className="inline-block text-xs col-span-1">
                                { `${moment(filteredEvent.start).format("lll")} - ${moment(filteredEvent.end).format("lll")}` }
                            </p>
                            <p className="inline-block text-xs col-span-1 text-right">{filteredEvent.location}</p>
                        </div>
                    );
                });

    const renderedListOngoing = events
        .sort((a, b) => a.start.localeCompare(b.start))
            .filter(event => event.status === "ongoing")
                .map(filteredEvent => {
                    return (
                        <div key={filteredEvent._id || Math.random()} className="bg-white px-4 py-2 mb-2 rounded-xl shadow-md grid grid-cols-2 gap-4 h-full">
                            <p className="inline-block text-lg col-span-full">{filteredEvent.title}</p>
                            <p className="inline-block text-xs col-span-1">
                                { `${moment(filteredEvent.start).format("lll")} - ${moment(filteredEvent.end).format("lll")}` }
                            </p>
                            <p className="inline-block text-xs col-span-1 text-right">{filteredEvent.location}</p>
                        </div>
                    );
                });

    return (
        <Fragment>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="max-w-full overflow-hidden bg-yellow-200 rounded-xl">
                    <div className="px-6 py-4 text-center">
                        <div className="font-bold text-lg mb-2">Upcoming</div>
                    </div>
                    {events.filter(event => event.status === "upcoming").length > 0 ? (
                        <div className="bg-yellow-100 px-4 py-2 overflow-auto max-h-64">
                            {renderedListUpcoming}
                        </div>
                    ) : (
                        <div className="bg-yellow-100 px-4 py-2 h-full">
                            <p className="m-8 text-center">Not available</p>  
                        </div>
                    )}
                </div>
                <div className="max-w-full overflow-hidden bg-green-200 rounded-xl">
                    <div className="px-6 py-4 text-center">
                        <div className="font-bold text-lg mb-2">Ongoing</div>
                    </div>
                    {events.filter(event => event.status === "ongoing").length > 0 ? (
                        <div className="bg-green-100 px-4 py-2 overflow-auto max-h-64">
                            {renderedListOngoing}
                        </div>
                    ) : (
                        <div className="bg-green-100 px-4 py-2 h-full">
                            <p className="m-8 text-center">Not available</p>  
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default Table;