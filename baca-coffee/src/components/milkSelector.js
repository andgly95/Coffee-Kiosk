import React from 'react';
import PropTypes from 'prop-types';
import ItemSelection from './itemSelection';
import { StyleSheet, css } from 'aphrodite';


const MilkSelector = ({ milkSelection, milk, changeMilk }) => {

    let selected = (milkSelection !== "select");

    let disabled = (milkSelection === "disabled");

    let milkButtons = Object.keys(milk).map(option => {
        return (
            <div className={css(styles.milkOption)}>
                <ItemSelection option={milk[option]} selection={milkSelection} key={option.id} type='milk' onSelect={changeMilk} />
                <p>{milk[option].name}</p>
            </div>
        )
    })
    return (
        <div className={css(styles.milkContainer, selected && styles.buttonSelected, disabled && styles.buttonDisabled)}>
            <p className={css(styles.header)}>Milk</p>
            <div className={css(styles.buttonContainer)}>
                {milkButtons}
            </div>

        </div>
    );
}

const styles = StyleSheet.create({
    milkContainer: {
        fontFamily: 'Brandon Grotesque',
        color: 'black',
        backgroundColor: 'rgba(199, 217, 240, .8)',
        fontSize: 10,
        borderRadius: 25,
        width: '90%',
        margin: 10,
        border: '2px solid red',

        '@media (orientation: portrait)': {
            width: '90%',
            fontSize: '3vw'
        },
        '@media (orientation: landscape)': {
            width: '90%',
            fontSize: '1.5vw'
        }

    },
    milkOption: {
        display: 'grid',
        gridTemplateColumns: '50% 50%'
    },
    buttonContainer: {
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(128, 128, 128, 0.623)',
        borderRadius: '2.5vw'
    },
    buttonSelected: {
        border: '2px solid yellow'
    },
    buttonDisabled: {
        backgroundColor: 'rgba(27,30,68, 0.623)',
        border: '2px solid black',
        display: 'none'
        
    },
    header: {
        margin: '.5em',
        '@media (orientation: portrait)': {
            fontSize: '4vw'
        },
        '@media (orientation: landscape)': {
            fontSize: '2vw'
        }
    }
})

MilkSelector.propTypes = {
    selection: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    drinks: PropTypes.object,
    changeMilk: PropTypes.func
}

export default MilkSelector;