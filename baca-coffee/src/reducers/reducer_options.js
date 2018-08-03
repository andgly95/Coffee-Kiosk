import { FETCH_OPTIONS } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
    case FETCH_OPTIONS:
        return action.payload;
    default:
        return state;
    }
}