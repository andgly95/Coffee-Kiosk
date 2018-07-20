import React from 'react';
import PropTypes from 'prop-types';
import ItemSelection from './itemSelection';
import { StyleSheet, css } from 'aphrodite';



const BeanSelector = ({ beanSelection, beans, changeBean }) => {

    let selected = "buttonContainer";
    if (beanSelection !== "select") selected += ' buttonContainerSelected';

    let beanButtons = beans.map(option => {
        return (
            <ItemSelection option={option} selection={beanSelection} key={option.id} type="add" onSelect={changeBean} />
        )
    })
    return (
        <div className={css(styles.beanContainer)}>
            <h3>Beans</h3>
            <div className={selected}>
                {beanButtons}
            </div>

        </div>
    );
}

const styles = StyleSheet.create({ 
    beanContainer: {
        fontFamily: "FuturaMediumBT, Trebuchet MS, Arial, sans-serif",
        color: "black",
        fontSize: 24,
        '@media (max-width: 720px)': {
            fontSize: 14
        },
        '@media (max-width: 1024px)': {
            fontSize: 14
        },
        '@media (orientation: landscape)': {
            fontSize: 18
        },
        backgroundColor: "rgba(180, 179, 170, 0.627)",
        borderRadius: 25,
        width: '50%',
        marginRight: 10
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