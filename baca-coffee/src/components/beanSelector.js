import React from 'react';
import PropTypes from 'prop-types';
import ItemSelection from './itemSelection';
import { StyleSheet, css } from 'aphrodite';


const BeanSelector = ({ beanSelection, beans, changeBean }) => {

    let selected = (beanSelection !== "select");

    let beanButtons = Object.keys(beans).map(option => {
        return (
            <div className={css(styles.beanOption)}>
            <ItemSelection option={beans[option]} selection={beanSelection} key={option.id} type='bean' onSelect={changeBean} />
            <div><p>{beans[option].name}</p>
            <p>Origin: {beans[option].origin}</p>
            <p>{beans[option].flavor}</p></div>
            </div>
        )
    })
    return (
        <div className={css(styles.beansContainer, selected && styles.buttonSelected)}>
            <p className={css(styles.header)}>Beans</p>
            <div className={css(styles.buttonContainer, )}>
                {beanButtons}
            </div>

        </div>
    );
}

const styles = StyleSheet.create({
    beansContainer: {
        fontFamily: 'Brandon Grotesque',
        color: 'black',
        fontSize: 10,
        backgroundColor: 'rgba(199, 217, 240, 0.8)',
        borderRadius: 25,
        border: '2px solid red',
        margin: 10,

        '@media (orientation: portrait)': {
            width: '90%',
            fontSize: '2.25vw'
        },
        '@media (orientation: landscape)': {
            width: '90%',
            fontSize: '1.25vw'
        }
    },
    beanOption: {
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
      header: {
        margin: '.5em',
        '@media (orientation: portrait)': {
            fontSize: '4vw'
        },
        '@media (orientation: landscape)': {
            fontSize: '2vw'
        }
    },
})

BeanSelector.propTypes = {
    selection: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    beans: PropTypes.object,
    changeBean: PropTypes.func
}

export default BeanSelector;