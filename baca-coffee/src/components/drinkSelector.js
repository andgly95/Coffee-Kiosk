import React from 'react';
import PropTypes from 'prop-types';
import ItemSelection from './itemSelection';
import { StyleSheet, css } from 'aphrodite';



const DrinkSelector = ({ drinkSelection, drinks, changeDrink }) => {

    let selected = "buttonContainer";
    if (drinkSelection !== "select") selected += ' buttonContainerSelected'; 

    let drinkButtons = drinks.map(option => {
        return (
            <ItemSelection option={option} selection={drinkSelection} key={option.id} type="drink" onSelect={changeDrink} />
        )
    });
    return (
        <div className={css(styles.drinksContainer)}>
            <h3>Drink Construction</h3>
            <div className={selected}>
                {drinkButtons}
            </div>

        </div>
    );

}

const styles = StyleSheet.create({ 
    drinksContainer: {
        fontFamily: "FuturaMediumBT, Trebuchet MS, Arial, sans-serif",
        color: "black",
        fontSize: 24,
        '@media (max-width: 1024px)': {
            fontSize: 14
        },
        '@media (orientation: landscape)': {
            fontSize: 18
        },
        '@media (max-width: 720px)': {
            fontSize: 10
        },
        
        backgroundColor: "rgba(180, 179, 170, 0.627)",
        borderRadius: 25,
        width: "100%",
        marginBottom: 20
    }
    
})

DrinkSelector.propTypes = {
    drinkSelection: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    drinks: PropTypes.array,
    changeDrink: PropTypes.func
}

export default DrinkSelector;