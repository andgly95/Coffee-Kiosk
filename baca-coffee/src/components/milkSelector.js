import React from 'react';
import PropTypes from 'prop-types';
import ItemSelection from './itemSelection';


const MilkSelector = ({ milkSelection, milk, changeMilk }) => {

    let selected = "buttonContainer";
    if (milkSelection !== "select") selected += ' buttonContainerSelected'; 
    let milkButtons = milk.map(option => {
        return (
            <ItemSelection option={option} selection={milkSelection} key={option.id} onSelect={changeMilk} />
        )
    })
    return (
        <div className="milkContainer">
            <h3>Milk</h3>
            <div className={selected}>
                {milkButtons}
            </div>

        </div>
    );
}

MilkSelector.propTypes = {
    selection: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    drinks: PropTypes.array,
    changeMilk: PropTypes.func
}

export default MilkSelector;