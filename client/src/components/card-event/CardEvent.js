import React, { Fragment } from 'react';
import CardItem from './CardItem';

const CardEvent = ({ events }) => {
    const filteredEvent = (filter) => {
        return events.filter(event => event.status === filter)
    }

    const renderedCard = (events, sortText, color) => {
        return (
            <div className={`max-w-full overflow-hidden bg-${color}-200 rounded-xl h-full`}>
                <div className="px-6 py-4 text-center">
                    <div className="font-bold text-lg mb-2">New</div>
                </div>
                { filteredEvent(sortText).length > 0 ? (
                    <div className={`bg-${color}-100 px-4 py-4 overflow-auto max-h-64`}>
                        <CardItem events={events} sortText={sortText} />
                    </div>
                ) : (
                    <div className={`bg-${color}-100 px-4 py-4 h-full`}>
                        <p className="self-center text-center italic">Not available</p>  
                    </div>
                )}
            </div>
        )
    }

    return (
        <Fragment>
            <div className="grid grid-cols-3 gap-4 mb-4">
                {renderedCard(events, '', 'yellow')}
                {renderedCard(events, 'upcoming', 'green')}
                {renderedCard(events, 'ongoing', 'blue')}
            </div>
        </Fragment>
    );
};

export default CardEvent;