import React from 'react';
import PropTypes from 'prop-types';
import ItemSelection from './itemSelection';



const DrinkSelector = ({ drinkSelection, drinks, changeDrink }) => {

    let selected = "buttonContainer";
    if (drinkSelection !== "select") selected += ' buttonContainerSelected'; 

    let drinkButtons = drinks.map(option => {
        return (
            <ItemSelection option={option} selection={drinkSelection} key={option.id} onSelect={changeDrink} />
        )
    });
    return (
        <div className="drinksContainer">
            <h3>Drink Construction</h3>
            <div className={selected}>
                {drinkButtons}
            </div>

        </div>
    );

}

DrinkSelector.propTypes = {
    selection: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    drinks: PropTypes.array,
    changeDrink: PropTypes.func
}

export default DrinkSelector;