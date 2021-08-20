import React from 'react';
import { Link }  from 'react-router-dom';
import moment from 'moment';

const CardItem = ({events, sortText }) => {
    const renderedList = events
        .sort((a, b) => a.start.localeCompare(b.start))
            .filter(event => event.status === sortText)
                .map(filteredEvent => {
                    return (
                        <div key={filteredEvent._id} className="bg-white px-4 py-2 mb-2 rounded-xl shadow-md grid grid-cols-2 gap-4 h-full">
                            <Link to={`/events/${filteredEvent._id}`} className="col-span-full"><p className="inline-block text-lg hover:text-gray-500">{filteredEvent.title}</p></Link>
                            <p className="inline-block text-xs col-span-1">
                                { `${moment(filteredEvent.start).format("lll")} - ${moment(filteredEvent.end).format("lll")}` }
                            </p>
                            <p className="inline-block text-xs col-span-1 text-right">{filteredEvent.location}</p>
                        </div>
                    );
                });

    return (
        <div>{renderedList}</div>
    )
}

export default CardItem;