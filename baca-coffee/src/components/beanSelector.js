import React from 'react';
import PropTypes from 'prop-types';
import ItemSelection from './itemSelection';


const BeanSelector = ({ beanSelection, beans, changeBean }) => {

    let selected = "buttonContainer";
    if (beanSelection !== "select") selected += ' buttonContainerSelected';

    let beanButtons = beans.map(option => {
        return (
            <ItemSelection option={option} selection={beanSelection} key={option.id} onSelect={changeBean} />
        )
    })
    return (
        <div className="beanContainer">
            <h3>Beans</h3>
            <div className={selected}>
                {beanButtons}
            </div>

        </div>
    );
}

BeanSelector.propTypes = {
    selection: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    beans: PropTypes.array,
    changeBean: PropTypes.func
}

export default BeanSelector;