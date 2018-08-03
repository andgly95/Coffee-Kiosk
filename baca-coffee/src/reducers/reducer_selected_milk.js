import { SELECT_MILK } from '../actions';

export default function(state = null, action) {
    switch(action.type){
    case SELECT_MILK:
        return action.payload;
    default:
        return state;
    }
}