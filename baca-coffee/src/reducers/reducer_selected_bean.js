import { SELECT_BEAN } from '../actions';

export default function(state = null, action) {
    switch(action.type){
    case SELECT_BEAN:
        return action.payload;
    }

    return state
}