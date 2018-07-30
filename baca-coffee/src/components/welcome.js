import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import Button from '@material-ui/core/Button';

const Welcome = () => {

    return (
        <div className={css(styles.welcome)}>

            <img className={css(styles.logo)} src={require('../resources/primary-logo.PNG')} />
            <div><b>Welcome to Truebird</b></div>
            <Button className={css(styles.welcomeButton)}><Link to='/order' style={{textDecoration: 'none', color: 'white'}}>Virtual Card Swipe</Link></Button>
            
            <Button className={css(styles.welcomeButton)}><Link to='/order' style={{textDecoration: 'none', color: 'white'}}>Browse</Link></Button>
            <div>to begin</div>
        </div>
    )

}

const styles = StyleSheet.create({
    welcome: {
        fontFamily: 'Brandon Grotesque',
        textAlign: 'center',
        color: 'white',
        margin: '10%',
        marginTop: '5%',
        border: '3px solid black',
        borderRadius: '2.5vw',
        backgroundColor: '#1B1E44',
        '@media (orientation: portrait)': {
            fontSize: '5vw',
            marginTop: '30%'
        },
        '@media (orientation: landscape)': {
            fontSize: '2.5vw'
        }
    },
    welcomeButton: {
        margin: 30,
        fontFamily: 'Brandon Grotesque',
        textTransform: 'none',
        borderRadius: '2.5vw',
        border: 3,
        fontWeight: 'light',
        width: '50%',
        color: 'white',
        border: '1px solid black',
        textAlign: 'center',
		'@media (orientation: portrait)': {
			fontSize: '4vw'
		},
		'@media (orientation: landscape)': {
			fontSize: '2vw'
		}
    },
    logo: {
        '@media (orientation: portrait)': {
			width: '40%'
        },
        '@media (orientation: landscape)': {
			width: '25%'
		}
        
    }

});

export default Welcome;