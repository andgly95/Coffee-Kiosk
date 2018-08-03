import React, { Component } from 'react';
import DrinkSelector from '../components/drinkSelector';
import BeanSelector from '../components/beanSelector';
import MilkSelector from '../components/milkSelector';
import ConstructedDrink from '../components/constructedDrink';
import ConfirmationScreen from '../components/confirmationScreen';
import { Carousel } from 'react-responsive-carousel';
import { StyleSheet, css } from 'aphrodite';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { fetchOptions, selectDrink, selectBean, selectMilk } from '../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';

require('../App.css');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: this.props.options,
			selection: {
				drink: "select",
				bean: "select",
				milk: "select"
			},
			milkLevel: 'none',
			name: "",
			showPayment: false
		}
	}

	componentWillMount() {
		this.props.fetchOptions;
	}

	openPayment() {
		this.setState({ showPayment: true });
	}

	changeName(newName) {
		this.setState({ name: newName });
	}

	submitOrder() {
		console.log("Selection received");
		//alert("Order received: "+this.state.selection.drink+", "+this.state.selection.bean+", "+this.state.selection.milk)

		let options = this.state.options;
		let drinks = options.drinks;
		let beans = options.beans;
		let milk = options.milk;
		let selection = this.state.selection;

		let order = {
			name: this.state.name,
			drinkName: drinks[selection.drink].name,
			beanSelection: beans[selection.bean].name,
			milkSelection: ((this.state.selection.milk != "select" && this.state.selection.milk != "disabled")) ? (milk[selection.milk].name) : 'no'
		}
		axios.get('http://10.105.44.41:1880/submit', {
			params: { options: JSON.stringify(order) }
		})
			.then((responseJson) => {
				let updatedStatus = JSON.parse(responseJson);
				//console.log("RESPONSE: ",updatedStatus);
			})
			.catch((error) => {
				console.error(error);
			})

		this.closePayment();
	}

	closePayment() {
		const newSelection = {
			drink: "select",
			bean: "select",
			milk: "select"
		}
		this.setState({
			showPayment: false,
			selection: newSelection
		});
	}

	fakeSwipe() {
		this.setState({
			name: '"Name From Card"',
			showSplashScreen: false
		})
	}

	changeDrink(optionID) {
		let selectedDrink = this.state.options.drinks[optionID];

		let newSelection = this.state.selection;
		let milkState = newSelection.milk;
		let milkLevel = this.state.milkLevel;
		if (selectedDrink.addMilk === false) {
			milkState = 'disabled';
			milkLevel = 'none';
		}
		else {
			milkState = (milkState !== 'select' && milkState !== 'required' && milkState !== 'disabled') ? milkState : "select";
		}

		if (selectedDrink.name === "americano") {
			milkState = "disabled";
			milkLevel = 5;
		}

		newSelection.drink = selectedDrink.id;
		newSelection.milk = milkState;
		this.setState({
			selection: newSelection,
			milkLevel: milkLevel
		});
	}

	changeMilk(optionID) {
		let newSelection = this.state.selection;
		newSelection.milk = optionID; +
			this.setState({ selection: newSelection });
	}

	changeBean(optionID) {
		let newSelection = this.state.selection;
		newSelection.bean = optionID;
		this.setState({ selection: newSelection });
	}

	changeMilkSlider(milkLevel) {

		if (milkLevel === 0) {
			let updatedDrinks = this.state.options;
			let americano = updatedDrinks.drinks['1'];
			americano.addMilk = 'false';
			americano.image = require('../resources/d_Americano.png')
			let newSelection = this.state.selection;
			newSelection.milk = "disabled";
			this.setState({
				options: updatedDrinks,
				selection: newSelection
			});
		}

		this.setState({ milkLevel })
	}

	toggleMilk() {
		let updatedDrinks = this.state.options;
		let americano = updatedDrinks.drinks.find((option) => option.name == "americano");
		americano.addMilk = 'true';
		americano.image = require('../resources/d_Americano_milk.png')
		let newSelection = this.state.selection;
		newSelection.milk = "required";
		this.setState({
			options: updatedDrinks,
			selection: newSelection,
			milkLevel: 5
		});
	}

	render() {
		let complete = ((this.state.selection.drinks !== 'select') && (this.state.selection.bean !== 'select') && (this.state.selection.milk !== 'select'));
		return (
			<div className={css(styles.container)}>
				<div className={css(styles.logo)}>
					<img src={require('../resources/logoWhite.png')} width='75%' />
				</div>
				<div className={css(styles.App)}>


					<ReactModal
						isOpen={this.state.showPayment}
						contentLabel="Payment Screen"
						className="payment"
					>
						<ConfirmationScreen
							selection={this.state.selection}
							options={this.state.options}
							name={this.state.name}
							changeName={this.changeName.bind(this)}
							closePayment={this.closePayment.bind(this)}
							submitOrder={this.submitOrder.bind(this)}
						/>
					</ReactModal>

					<DrinkSelector drinkSelection={this.state.selection.drink} drinks={this.state.options.drinks} changeDrink={this.props.selectDrink} />

					{/* <ConstructedDrink
						selection={this.state.selection}
						options={this.state.options}
						submitOrder={this.openPayment.bind(this)}
						changeMilkSlider={this.changeMilkSlider.bind(this)}
						milkLevel={this.state.milkLevel}
						toggleMilk={this.toggleMilk.bind(this)}
					/> */}
					<div className={css(styles.selectorContainer)}>


						<BeanSelector beanSelection={this.state.selection.bean} beans={this.state.options.beans} changeBean={this.changeBean.bind(this)} />
						<MilkSelector milkSelection={this.state.selection.milk} milk={this.state.options.milk} changeMilk={this.changeMilk.bind(this)} />

					</div>
					<div className={css(styles.order, complete && styles.appear)} onClick={this.openPayment.bind(this)}><span>PLACE ORDER</span></div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	//Whatever is returned will show up as props in App
	return {
		options: state.options,
		selectedDrink: state.selectedDrink,
		selectedBean: state.selectedBean,
		selectedMilk: state.selectedMilk
	};
}

//Anything returned will end up as props in the container
function mapDispatchToProps(dispatch) {
	//Whenever selectDrink is called, the result shoudl be dispatched to all reducers
	return bindActionCreators({ selectDrink: selectDrink, fetchOptions: fetchOptions, selectBean: selectBean, selectMilk: selectMilk }, dispatch)
}

//Promote App from component to container, needs to know about dispatch methods
export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		display: 'grid',
		gridTemplateRows: '25% 75%',
		justifyItems: 'center',
		marginTop: '5%',
		paddingLeft: '5%',
		paddingRight: '5%'
	},
	App: {
		width: '100%',
		textAlign: 'center',
		justifyItems: 'center',
		alignItems: 'center',
		'@media (orientation: portrait)': {
			flexFlow: 'column nowrap',
			display: 'flex',
		},
		'@media (orientation: landscape)': {
			display: 'grid',
			gridTemplateColumns: '50% 50%',
		}
	},
	logo: {
		paddingTop: '5%',
		paddingBottom: '5%',
		textAlign: 'center',
		'@media (max-width: 1024px)': {
			width: '40%',
			paddingTop: '3%',
			paddingBottom: '3%'
		},
		'@media (max-width: 600px)': {
			width: '80%'
		},
		'@media (orientation: landscape)': {

			width: '40%',
			padding: '2%'
		}
	},
	order: {
		marginLeft: 30,
		marginRight: 30,
		borderRadius: 10,
		fontFamily: 'Union',
		color: 'white',
		backgroundColor: 'rgb(27,30,68)',
		width: '90%',
		paddingTop: 15,
		paddingBottom: 15,
		fontSize: 24,
		verticalAlign: 'center',
		border: '2px black solid',
		display: 'none'
	},
	appear: {
		display: 'block'
	},
	selectorContainer: {
		display: 'flex',
		flexFlow: 'column nowrap',
		alignItems: 'center'
	},
	bottomRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	}
})