import React, { Fragment } from 'react';
import CardItem from './CardItem';

const CardEvent = ({ path, events, title, sortText, color, high, highBody=null }) => {
    const filteredEvent = (filter) => {
        return events.filter(event => event.status === filter)
    }

    const renderedItem = (pathname) => {
        switch(`${pathname}`){
            case '/':
                return (<CardItem events={events} sortText={sortText} titleSize={'3xl'} textSize={'3xl'} />)
            default:
                return (<CardItem events={events} sortText={sortText} titleSize={'lg'} textSize={'base'} />)
        }
    }

    const renderedCard = () => {
        return (
            <div className={`max-w-full overflow-hidden bg-${color}-200 rounded-xl text ${high}`}>
                <div className="px-6 py-4 text-center">
                    <div className="font-bold text-lg mb-2">{title}</div>
                </div>
                { filteredEvent(sortText).length > 0 ? (
                    <div className={`bg-${color}-100 px-4 py-4 overflow-auto ${highBody} ${high}`}>
                        {renderedItem(path)}
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
            {renderedCard()}
        </Fragment>
    );
};

export default CardEvent;