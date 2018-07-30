import React from 'react';
import Button from '@material-ui/core/Button';

const ConfirmationScreen = ({ selection, options, name, changeName, closePayment, submitOrder }) => {
    let drinkChoice = (selection.drink != "select") ? (options.drinks[selection.drink]) : {name: ""};
	let beanChoice =  (selection.bean != "select") ? (options.beans[selection.bean]) : {name: ""};
	let milkChoice =  (selection.milk != "select" && selection.milk != "disabled") ? (options.milk[selection.milk]) : {name: "no"};
	let milkReceipt = (milkChoice.name !== 'no') ? (<li className="receipt-entry">{milkChoice.name}</li>) : "";
	let confirmClass = (name=="") ? "confirm confirm-order unconfirmed" : "confirm confirm-order";
	let nameBoxClass =(name == "") ? "nameBox nameBox-empty" : "nameBox";
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
                onChange={(event) => changeName( event.target.value )}
            />

            <br />
            <Button className={confirmClass} onClick={submitOrder}>Order Drink</Button>
            <Button className="confirm confirm-order" onClick={closePayment}>Go Back</Button>
        </div>
    )
}

export default ConfirmationScreen;