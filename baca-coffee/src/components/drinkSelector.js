import React from 'react';
import PropTypes from 'prop-types';
import ItemSelection from './itemSelection';
import { StyleSheet, css } from 'aphrodite';



const DrinkSelector = ({ drinkSelection, drinks, changeDrink }) => {

    let selected = "buttonContainer";
    if (drinkSelection !== "select") selected += ' buttonContainerSelected'; 

    let drinkButtons = drinks.map(option => {
        return (
            <ItemSelection option={option} selection={drinkSelection} key={option.id} type='drink' onSelect={changeDrink} />
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
    fontFamily: '"FuturaMediumBT", "Trebuchet MS", Arial, sans-serif',
    color: 'black',
    backgroundColor: 'rgba(180, 179, 170, 0.627)',
    borderRadius: 25,
    marginBottom: '2%',
    '@media (orientation: portrait)': {
        width: '90%',
        fontSize: '2.5vw'
    },
    '@media (orientation: landscape)': {
        width: '90%',
        fontSize: '1.25vw'
    }    
  }
})

DrinkSelector.propTypes = {
    selection: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    drinks: PropTypes.array,
    changeDrink: PropTypes.func
}

export default DrinkSelector;