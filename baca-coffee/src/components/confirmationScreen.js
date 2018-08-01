import React from 'react';
import Button from '@material-ui/core/Button';
import { StyleSheet, css } from 'aphrodite';

const ConfirmationScreen = ({ selection, options, name, changeName, closePayment, submitOrder }) => {
    let drinkChoice = (selection.drink != "select") ? (options.drinks[selection.drink]) : { name: "" };
    let beanChoice = (selection.bean != "select") ? (options.beans[selection.bean]) : { name: "" };
    let milkChoice = (selection.milk != "select" && selection.milk != "disabled") ? (options.milk[selection.milk]) : { name: "no" };
    let milkReceipt = (milkChoice.name !== 'no') ? (<li className="receipt-entry">{milkChoice.name}</li>) : "";
    let confirmClass = (name == "");
    let nameBoxClass = (name == "") ? "nameBox nameBox-empty" : "nameBox";
    return (
        <div>
            <h3 className="prepared">Order Summary:</h3>
            <ul className="receipt">
                <li className="receipt-entry">{drinkChoice.name}</li>
                <li className="receipt-entry">{beanChoice.name}</li>
                {milkReceipt}
            </ul>
            <input
                type="text"
                placeholder="Enter Name"
                className={nameBoxClass}
                value={name}
                autoFocus
                onChange={(event) => changeName(event.target.value)}
            />

            <br />
            <Button className={css(styles.confirm, confirmClass && styles.unconfirmed)} onClick={submitOrder}>Order Drink</Button>
            <Button className={css(styles.confirm)} onClick={closePayment}>Go Back</Button>
        </div>
    )
}

const styles = StyleSheet.create({
    confirm: {
        padding: '2%',
        margin: '2%',
        border: 'solid 3px black',
        borderRadius: '2.5vw',
        fontSize: '2.5vw',
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Brandon Grotesque',
        textTransform: 'uppercase',
        width: '30%',
        margin: 'auto'
    },
    unconfirmed: {
        opacity: .5,
        pointerEvents: 'none'
    }
})

export default ConfirmationScreen;