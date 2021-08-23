import { 
    GET_EVENT, 
    GET_EVENTS, 
    EVENT_ERROR, 
    CLEAR_EVENT, 
    UPDATE_EVENT, 
    DELETE_EVENT
} from '../actions/types';

const initialState = {
    events: [],
    event: null,
    loading: true,
    error: {}
};

function eventReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_EVENT:
        case UPDATE_EVENT:
            return {
                ...state,
                event: payload,
                loading: false
            };
        case GET_EVENTS:
            return {
                ...state,
                events: payload,
                loading: false
            };
        case DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter((event) => event._id !== payload),
                loading: false
            };
        case EVENT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_EVENT:
            return {
                ...state,
                event: null
            };
        default:
            return state;
    };
};

export default eventReducer;