import React from 'react';
import PropTypes from 'prop-types';
import ItemSelection from './itemSelection';
import { StyleSheet, css } from 'aphrodite';


const MilkSelector = ({ milkSelection, milk, changeMilk }) => {

    let selected = "buttonContainer";
    if (milkSelection !== "select") selected += ' buttonContainerSelected'; 
    let milkButtons = milk.map(option => {
        return (
            <ItemSelection option={option} selection={milkSelection} key={option.id} type="add" onSelect={changeMilk} />
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
        width: '50%',
        marginLeft: 10
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