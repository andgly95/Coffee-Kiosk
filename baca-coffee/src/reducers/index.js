import { combineReducers } from 'redux';
import OptionsReducer from './reducer_options';
import SelectedDrink from './reducer_selected_drink';
import SelectedBean from './reducer_selected_bean';
import SelectedMilk from './reducer_selected_milk';

const rootReducer = combineReducers({
    options: OptionsReducer,
    selectedDrink: SelectedDrink,
    selectedBean: SelectedBean,
    selectedMilk: SelectedMilk
});

export default rootReducer;