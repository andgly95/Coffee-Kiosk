import React from 'react';
import PropTypes from 'prop-types';
import ItemSelection from './itemSelection';
import { StyleSheet, css } from 'aphrodite';


const BeanSelector = ({ beanSelection, beans, changeBean }) => {

    let selected = "buttonContainer";
    if (beanSelection !== "select") selected += ' buttonContainerSelected';

    let beanButtons = beans.map(option => {
        return (
            <ItemSelection option={option} selection={beanSelection} key={option.id} type='bean' onSelect={changeBean} />
        )
    })
    return (
        <div className={css(styles.beansContainer)}>
            <h3>Beans</h3>
            <div className={selected}>
                {beanButtons}
            </div>

        </div>
    );
}

const styles = StyleSheet.create({
    beansContainer: {
        fontFamily: '"FuturaMediumBT", "Trebuchet MS", Arial, sans-serif',
        color: 'black',
        fontSize: 10,
        backgroundColor: 'rgba(180, 179, 170, 0.627)',
        borderRadius: 25,
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

BeanSelector.propTypes = {
    selection: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    beans: PropTypes.array,
    changeBean: PropTypes.func
}

export default BeanSelector;