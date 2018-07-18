import React from 'react';

const ConfirmationScreen = ({ selection, options, name, changeName, closePayment, submitOrder }) => {
    let drinkChoice = (selection.drink != "select") ? (options.drinks.find((option) => option.id == selection.drink)) : {name: ""};
	let beanChoice =  (selection.bean != "select") ? (options.beans.find((option) => option.id == selection.bean)) : {name: ""};
	let milkChoice =  (selection.milk != "select" && selection.milk != "disabled") ? (options.milk.find((option) => option.id == selection.milk)) : {name: "no"};
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
            <button className={confirmClass} onClick={submitOrder}>Order Drink</button>
            <button className="confirm confirm-order" onClick={closePayment}>Go Back</button>
        </div>
    )
}

export default ConfirmationScreen;