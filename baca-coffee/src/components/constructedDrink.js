import React from 'react';
import Slider, { Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import emptyCup from '../resources/d_empty.png';

const Handle = Slider.Handle;

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

const ConstructedDrink = ({ selection, options, submitOrder, changeMilkSlider, milkLevel, toggleMilk }) => {

    let drinkChoice = (selection.drink !== 'select') ? options.drinks.find(drink => drink.id === selection.drink) : "";
    let beanChoice = (selection.bean !== 'select') ? options.beans.find(bean => bean.id === selection.bean) : false;
    let milkChoice = (selection.milk !== 'select' && selection.milk !== 'disabled') ? options.milk.find(milk => milk.id === selection.milk) : false;

    let displayImage = drinkChoice.image ? drinkChoice.image : emptyCup;
    
    let milkText = (milkChoice) ? (milkChoice.name) : "Choose a milk";
    milkText = (selection.milk === 'disabled' || selection.drink === 'select') ? "" : milkText;
    milkText = (selection.drink === 1 && selection.milk === "disabled")? (<div className="confirm" onClick={toggleMilk}>Add Milk</div>) : milkText;
    let beanText = (selection.drink !== 'select') ? "Choose a bean" : "";
    beanText = (beanChoice) ? ("You have selected " + beanChoice.name) : beanText;

    let drinkDescription = drinkChoice.description ? drinkChoice.description : "Choose a drink below to get started";
    let beanDescription = (beanChoice) ? (beanChoice.description) : "\n\n\n";
    let confirmButton = (beanChoice && (!drinkChoice.addMilk || milkChoice || selection.milk === 'optional')) ? (<div className="confirm" onClick={submitOrder}>Confirm</div>) : (<div className="confirm unconfirmed" >Confirm</div>);

    let slider = (selection.drink === 1 && selection.milk !== 'disabled') ? (<div style={{ float: 'right', height: 300, marginRight: 100, marginTop: 100 }}>
        <p>Max Milk</p><Slider min={0} max={10} style={{marginLeft: 20}} defaultValue={milkLevel} vertical={true} handle={handle} onChange={changeMilkSlider} /><p>No Milk</p>
    </div>) : <div style={{ float: 'right', height: 300, marginRight: 100, marginTop: 100 }} /> ;

    let milkOverlay = (selection.drink === 1 && selection.milk !== 'disabled')? "milkOverlay" : "";
    let milkOpacity = milkLevel / 10;

    return (
        <div className="constructed">
            <div className="constructedTop">
                <img className="cupImage" src={displayImage} width={500} height={500} alt={drinkChoice.name} />
                <span className={milkOverlay} style={{opacity: milkOpacity}} />
                {slider}
            </div>
            <div className="constructedBottom">
                <div className="description drink-desc">{drinkDescription}</div>
                <div className="description bean-desc"><b>{beanText}</b><br />{beanDescription}</div>
                <div className="description milk-desc">{milkText}<br /></div>
                {confirmButton}
            </div>

        </div>
    );

}

export default ConstructedDrink;