import React from 'react';
import PropTypes from 'prop-types';
import ItemSelection from './itemSelection';
import { StyleSheet, css } from 'aphrodite';


const MilkSelector = ({ milkSelection, milk, changeMilk }) => {

    let selected = "buttonContainer";
    if (milkSelection !== "select") selected += ' buttonContainerSelected'; 
    let milkButtons = milk.map(option => {
        return (
            <ItemSelection option={option} selection={milkSelection} key={option.id} type='milk' onSelect={changeMilk} />
        )
    })
    return (
        <div className={css(styles.milkContainer)}>
            <h3>Milk</h3>
            <div className={selected}>
                {milkButtons}
            </div>

        </div>
    );
}

const styles = StyleSheet.create({
    milkContainer: {
       fontFamily: '"FuturaMediumBT", "Trebuchet MS", Arial, sans-serif',
       color: 'black',
       backgroundColor: 'rgba(180, 179, 170, 0.627)',
       fontSize: 10,
       borderRadius: 25,
       width: '44%',
       margin: 10,

       '@media (orientation: portrait)': {
           width: '44%',
           fontSize: '2.5vw'
       },
       '@media (orientation: landscape)': {
           width: '45%',
           fontSize: '1.25vw'
       }
    
     }
   })

MilkSelector.propTypes = {
    selection: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    drinks: PropTypes.array,
    changeMilk: PropTypes.func
}

export default MilkSelector;