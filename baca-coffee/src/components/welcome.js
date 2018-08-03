import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import Button from '@material-ui/core/Button';

const Welcome = () => {

    return (
        <div className={css(styles.welcome)}>

            <img className={css(styles.logo)} src={require('../resources/emptycup-logo.png')} />
            <Button className={css(styles.welcomeButton)}><Link to='/order' style={{textDecoration: 'none', color: 'black'}}>BROWSE RECIPES</Link></Button>
            
            <Button className={css(styles.welcomeButton, styles.primaryButton)}><Link to='/order' style={{textDecoration: 'none', color: 'black'}}>SWIPE CARD</Link></Button>
            
        </div>
    )

}

const styles = StyleSheet.create({
    welcome: {
        fontFamily: 'Brandon Grotesque',
        textAlign: 'center',
        color: 'black',
        margin: '10%',
        border: '3px solid black',
        borderRadius: '2.5vw',
        backgroundImage: require('../resources/wood.jpg'),
        '@media (orientation: portrait)': {
            fontSize: '5vw',
        },
        '@media (orientation: landscape)': {
            fontSize: '2.5vw'
        }
    },
    welcomeButton: {
        margin: 15,
        width: '90%',
        fontFamily: 'Brandon Grotesque',
        textTransform: 'none',
        borderRadius: '2.5vw',
        border: 3,
        fontWeight: 'light',
        color: 'black',
        border: '1px solid black',
        textAlign: 'center',
		'@media (orientation: portrait)': {
			fontSize: '4vw'
		},
		'@media (orientation: landscape)': {
			fontSize: '2vw'
		}
    },
    primaryButton: {
        backgroundColor: '#C7D9F0'
    },
    logo: {
        '@media (orientation: portrait)': {
			width: '80%'
        },
        '@media (orientation: landscape)': {
			width: '25%'
		}
        
    }

});

export default Welcome;