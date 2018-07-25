import React from 'react';
import Slider, { Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import emptyCup from '../resources/d_empty.png';
import { StyleSheet, css } from 'aphrodite';

const Handle = Slider.Handle;

const handle = (props) => {
    const { value, dragging, index } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} />
        </Tooltip>
    );
};

const marks = {
    1: ' ',
    2: '1',
    3: ' ',
    4: '2',
    5: ' ',
    6: '3',
    7: ' ',
    8: '4',
    9: ' ',
    10: '5'
}

const ConstructedDrink = ({ selection, options, submitOrder, changeMilkSlider, milkLevel, toggleMilk }) => {

    let drinkChoice = (selection.drink !== 'select') ? options.drinks.find(drink => drink.id === selection.drink) : "";
    let beanChoice = (selection.bean !== 'select') ? options.beans.find(bean => bean.id === selection.bean) : false;
    let milkChoice = (selection.milk !== 'select' && selection.milk !== 'disabled') ? options.milk.find(milk => milk.id === selection.milk) : false;

    let displayImage = drinkChoice.image ? drinkChoice.image : emptyCup;

    let milkText = (milkChoice) ? (milkChoice.name) : "Choose a milk";
    milkText = (selection.milk === 'disabled' || selection.drink === 'select') ? "" : milkText;
    milkText = (selection.drink === 1 && selection.milk === "disabled") ? (<span onClick={toggleMilk}>Add Milk</span>) : milkText;
    let beanText = (selection.drink !== 'select') ? "Choose a bean" : 'Choose a drink below to get started';
    beanText = (beanChoice) ? ("You have selected " + beanChoice.name) : beanText;

    let beanDescription = (beanChoice) ? (beanChoice.description) : "\n\n\n";
    let confirmButton = (beanChoice && (!drinkChoice.addMilk || milkChoice || selection.milk === 'optional')) ? (<div className="confirm" onClick={submitOrder}>Confirm</div>) : (<div className="confirm unconfirmed" >Confirm</div>);

    let slider = (selection.drink === 1 && selection.milk !== 'disabled') ? (<div style={{ float: 'right', height: '50%', marginRight: '50%', marginTop: '50%' }}>
        <p className={css(styles.milkSliderText)}>Max Milk</p><Slider min={0} max={10} defaultValue={milkLevel} vertical={true} marks={marks} handle={handle} onChange={changeMilkSlider} /><p className={css(styles.milkSliderText)}>No Milk</p>
    </div>) : '';

    let milkOverlay = (selection.drink === 1 && selection.milk !== 'disabled') ? css(styles.milkOverlay) : "";
    let milkOpacity = milkLevel / 10;
    let milkOverlayUrl =  (milkOverlay)? require('../resources/milkoverlay.png') : '';

    return (
        <div className={css(styles.constructed)}>
            <div className={css(styles.constructedTop)}>
                <div className="leftCup" />
                <div className="middleCup"><img className={css(styles.cupImage)} src={displayImage} alt={drinkChoice.name} />
                    <div className={milkOverlay} style={{ opacity: milkOpacity }} ><img className={css(styles.overlayImg)} src={milkOverlayUrl} /></div></div>
                <div className='rightCup'>

                    {slider} </div>
            </div>
            <div className="constructedBottom">
                <div className={css(styles.description)}>{beanText}<br />{beanDescription}</div>
                <div className={css(styles.description)}>{milkText}<br /></div>
                {confirmButton}
            </div>

        </div>
    );

}

const styles = StyleSheet.create({
    constructed: {
        backgroundColor: '#ADA996A0',
        background: 'radial-gradient(#EAEAEA 25%, #ADA996C0 90%)',
        borderRadius: 50,
        padding: 25,
        paddingTop: 0,
        display: 'flex',
        flexFlow: 'column nowrap',
        '@media (orientation: portrait)': {
            width: '80%'
        },
        '@media (orientation: landscape)': {
            width: '80%'
        }
    },
    constructedTop: {
        display: 'grid',
        gridTemplateColumns: ' 20% 60% 20%'
    },
    description: {
        fontFamily: '"FuturaMediumBT", "Trebuchet MS", Arial, sans-serif',
        margin: '2%',
        '@media (orientation: portrait)': {
            fontSize: '2.5vw',
            margin: '5%'
        },
        '@media (orientation: landscape)': {
            fontSize: '1.25vw',
            margin: '5%'
        },

    },
    milkSliderText: {
        '@media (orientation: portrait)': {
            fontSize: '1vw',
        },
        '@media (orientation: landscape)': {
            fontSize: '.5vw',
        }
    },
    milkOverlay: {
        position: 'absolute',
        width: '100%',
        top: '0'
    },
    overlayImg: {
        position: 'relative',
        width: '80%',
    },
    milkImage: {
        position: 'absolute',
        width: '80%'
    },
    cupImage: {
        position: 'relative',
        width: '80%',
    }


      
      
  
})

export default ConstructedDrink;