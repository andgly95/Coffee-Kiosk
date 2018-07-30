import React, { Component } from 'react';
import DrinkSelector from './components/drinkSelector';
import BeanSelector from './components/beanSelector';
import MilkSelector from './components/milkSelector';
import ConstructedDrink from './components/constructedDrink';
import ConfirmationScreen from './components/confirmationScreen';
import { Carousel } from 'react-responsive-carousel';
import { StyleSheet, css } from 'aphrodite';
import ReactModal from 'react-modal';
import axios from 'axios';

require('./App.css');

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: {
				drinks: {
					0: {
						name: "espresso",
						status: 1,
						addMilk: false,
						image: require('./resources/d_Espresso.png'),
						id: 0
					},
					1: {
						name: "americano",
						status: 1,
						addMilk: false,
						image: require('./resources/d_Americano.png'),
						id: 1
					},
					2: {
						name: "cappuccino",
						status: 1,
						addMilk: true,
						image: require('./resources/d_Cappuccino.png'),
						id: 2
					},
					3: {
						name: "latte",
						status: 1,
						addMilk: true,
						image: require('./resources/d_Latte.png'),
						id: 3
					}
				},
				beans: {
					4: {
						name: "Stumptown Hair Bender",
						status: 1,
						image: require('./resources/b_Stumptown_Hair-Bender.png'),
						id: 4,
						origin: 'Indonesia',
						flavor: 'Citrus Dark Chocolate'
					},
					5: {
						name: "Sey Ivan Molano",
						status: 1,
						image: require('./resources/b_Sey_Ivan-Molano-Colombia.png'),
						id: 5,
						origin: 'Colombia',
						flavor: 'Tropical Fruits'
					}
				},
				milk: {
					6: {
						name: "Whole Milk",
						brand: "Battenkill Valley",
						status: 1,
						image: require('./resources/m_Battenkill_Whole_Milk.png'),
						id: 6
					},
					7: {
						name: "Almond Milk",
						brand: "Barista Blend",
						status: 1,
						image: require('./resources/m_Almond-Milk.png'),
						id: 7
					}

				}
			},
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

	componentDidMount() {
		const images = this.importImages(require.context('./resources', false, /\.(png)$/));
		console.log(images);
	}

	importImages(r) {
		let images = {};
		r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
		return images;
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
			americano.image = require('./resources/d_Americano.png')
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
		americano.image = require('./resources/d_Americano_milk.png')
		let newSelection = this.state.selection;
		newSelection.milk = "required";
		this.setState({
			options: updatedDrinks,
			selection: newSelection,
			milkLevel: 5
		});
	}

	render() {
		return (
			<div className={css(styles.container)}>
				<div className={css(styles.logo)}>
					<img src={require('./resources/logoWhite.png')} width='75%' />
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

					<DrinkSelector drinkSelection={this.state.selection.drink} drinks={this.state.options.drinks} changeDrink={this.changeDrink.bind(this)} />
						
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
				</div>
			</div>
		);
	}
}
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

	selectorContainer: {
		display: 'flex',
		flexFlow: 'column nowrap',
		alignItems: 'center',
		marginTop: '5%',
		marginBottom: '5%'
	},
	bottomRow: {
		display: 'flex',
  		flexDirection: 'row',
  		justifyContent: 'center'
	}
})