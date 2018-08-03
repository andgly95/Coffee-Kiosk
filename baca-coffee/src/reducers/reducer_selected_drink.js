import { SELECT_DRINK } from '../actions';

export default function(state = null, action) {
    switch(action.type){
    case SELECT_DRINK:
        return action.payload;
    default:
        return state;
    }
}