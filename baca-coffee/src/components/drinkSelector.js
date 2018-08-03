import React from 'react';
import PropTypes from 'prop-types';
import ItemSelection from './itemSelection';
import { Carousel } from 'react-responsive-carousel';
import { StyleSheet, css } from 'aphrodite';
import { Card } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import "react-responsive-carousel/lib/styles/carousel.min.css";



const DrinkSelector = ({ drinkSelection, drinks, changeDrink }) => {

    let selected = (drinkSelection!=='select')? `You have selected ${drinks[drinkSelection].name}` : "Tap to select";

    let remove = (drinkSelection!=='select');

    if(drinkSelection === 'select') drinkSelection = 1;
    let drinkOptions = Object.keys(drinks).map(option => {
        return (
            <ItemSelection option={drinks[option]} selection={drinkSelection} key={option.id} type='drink' onSelect={changeDrink} />
        )
    });
    let updateSlide = (index) => {
        console.log(index);
        changeDrink(index);
    }
    let selectionText = (drinks[drinkSelection].name)? drinks[drinkSelection].name : {};
    return (
        <div>
        <div className={css(styles.drinksContainer, remove && styles.drinkSelected)}>
            <Carousel selectedItem={drinkSelection} emulateTouch onChange={() => updateSlide} centerMode centerSlidePercentage={50} infiniteLoop={true} showStatus={false} showIndicators={false} showThumbs={false} className={css(styles.carousel, remove && styles.remove)}>
                <Card className={css(styles.card)} onClick={() => changeDrink(drinks[drinkSelection])}>
                    <CardMedia
                        className={css(styles.drinkImage)}
                        image={require('../resources/espresso.png')}
                        title="Espresso"
                    />
                    <p>Espresso</p>
                </Card>
                <Card className={css(styles.card)} onClick={() => changeDrink(drinks[drinkSelection])}>
                    <CardMedia
                        className={css(styles.drinkImage)}
                        image={require('../resources/americano.png')}
                        title="Americano"
                    /><p>Americano</p></Card>
                <Card className={css(styles.card)} onClick={() => changeDrink(drinks[drinkSelection])}><CardMedia
                    className={css(styles.drinkImage)}
                    image={require('../resources/cappuccino.png')}
                    title="Cappuccino"
                /> <p>Cappuccino</p></Card>
                <Card className={css(styles.card)} onClick={() => changeDrink(drinks[drinkSelection])}><CardMedia
                    className={css(styles.drinkImage)}
                    image={require('../resources/latte.png')}
                    title="Americano"
                /><p>Latte</p></Card>
            </Carousel>
            </div>
            <div>
            <p className={css(styles.chooseDrink)}>CHOOSE A DRINK</p>
            </div>
            <div className={css(styles.drinkSelection)}>
            <p className={css(styles.promptText)}>I would like an</p>
            <p className={css(styles.responseText)}><i>{selectionText}</i></p>
            </div>
        </div>
    );

}

const styles = StyleSheet.create({
    drinksContainer: {
        fontFamily: 'Brandon Grotesque',
        color: 'black',
        textAlign: 'center',
        backgroundColor: 'rgba(199, 217, 240, 0.8)',
        border: '2px solid white',
        '@media (orientation: portrait)': {
            width: '100%',
            fontSize: '4vw'
        },
        '@media (orientation: landscape)': {
            width: '80%',
            fontSize: '2vw'
        }
    },
    card: {
        paddingTop: 30
    },
    drinkSelected: {
        border: '2px solid yellow',
    },
    drinkImage: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        backgroundSize: 'contain'
    },
    drinkSelection: {
        backgroundColor: '#B7CFD0'
    },
    promptText: {
        fontFamily: 'Brandon Grotesque',
        fontWeight: 'light'
    },
    responseText: {
        fontFamily: 'Brandon Grotesque',
        fontWeight: 'regular'
    },
    header: {
        margin: '.5em'
    },
	chooseDrink: {
		fontFamily: 'Brandon Grotesque',
		fontSize: 24,
		textAlign: 'right',
		color: 'white'	
	},
    carousel: {
        width: '100%',
        margin: 'auto'
    },
    
})

DrinkSelector.propTypes = {
    selection: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    drinks: PropTypes.object,
    changeDrink: PropTypes.func
}

export default DrinkSelector;