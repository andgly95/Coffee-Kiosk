import React, { Component } from 'react';
import DrinkSelector from './components/drinkSelector';
import BeanSelector from './components/beanSelector';
import MilkSelector from './components/milkSelector';
import ConstructedDrink from './components/constructedDrink.jsx';
import ConfirmationScreen from './components/confirmationScreen';
import ReactModal from 'react-modal';
import axios from 'axios';

require('./App.css');

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: {
				drinks: [
					{
						name: "espresso",
						// description: "Made by forcing very hot water under high pressure through finely ground fresh coffee, espresso is the foundation for many other coffee drinks",
						description: "Espresso ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
						status: 1,
						addMilk: false,
						image: require('./resources/d_Espresso.png'),
						id: 0
					},
					{
						name: "americano",
						// description: "The term 'Americano' was coined during World War II, when American soldiers diluted espresso with hot water to satisfy their desire for more sips in a cup",
						description: "The term 'Americano' enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
						status: 1,
						addMilk: false,
						image: require('./resources/d_Americano.png'),
						id: 1
					},
					{
						name: "cappuccino",
						// description: "Cappuccino is an exquisite balance of flavors between the bitterness of espresso, the sweetness of hot milk and the sticky consistency of steamed foam",
						description: "Cappuccino  aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
						status: 1,
						addMilk: true,
						image: require('./resources/d_Cappuccino.png'),
						id: 2
					},
					{
						name: "latte",
						// description: 'Italian for "coffee with milk", the Caffe Latte is a classical combination of one shot of espresso and steamed milk with a light layer of sweet foam',
						description: "Italian for 'coffee with milk', the Caffe Latte sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
						status: 1,
						addMilk: true,
						image: require('./resources/d_Latte.png'),
						id: 3
					}
				],
				beans: [
					{
						name: "Stumptown Hair Bender",
						//description: "A cup of Hair Bender has clarity and complexity; Indonesia’s rich textures are balanced by the classic flavors of Latin America and Africa. ",
						description: "Stumptown's Hair Bender ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
						status: 1,
						image: require('./resources/b_Stumptown_Hair-Bender.png'),
						id: 4
					},
					{
						name: "Sey Ivan Molano Colombia",
						//description: 'Ivan comes from many generations of coffee growers. His farm rests in the clouds at 2,070 masl, making it one of the highest farms in Colombia',
						description: "Ivan Molano enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem cillum dolore.",
						status: 1,
						image: require('./resources/b_Sey_Ivan-Molano-Colombia.png'),
						id: 5
					}
				],
				milk: [
					{
						name: "Battenkill Valley Whole Milk",
						status: 1,
						image: require('./resources/m_Battenkill_Whole_Milk.png'),
						id: 6
					},
					{
						name: "Barista Blend Almond Milk",
						status: 1,
						image: require('./resources/m_Almond-Milk.png'),
						id: 7
					}

				]
			},
			selection: {
				drink: "select",
				bean: "select",
				milk: "select"
			},
			milkLevel: 'none',
			name: "",
			showPayment: false,
			showSplashScreen: true
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
			drinkName: drinks.find((option) => option.id == selection.drink).name,
			beanSelection: beans.find((option) => option.id == selection.bean).name,
			milkSelection: ((this.state.selection.milk != "select" && this.state.selection.milk != "disabled")) ? (milk.find((option) => option.id == selection.milk).name) : 'no'
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

	closeSplashScreen() {
		this.setState({ showSplashScreen: false });
	}

	fakeSwipe() {
		this.setState({
			name: '"Name From Card"',
			showSplashScreen: false
		})
	}

	changeDrink(optionID) {
		let selectedDrink = this.state.options.drinks.filter((option) => option.id === optionID);
		selectedDrink = selectedDrink[0];

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
			let americano = updatedDrinks.drinks.find((option) => option.name == "americano");
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

			<div className="App">

				<header className="logo"> Truebird Coffee </header>

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

				<ReactModal
					isOpen={this.state.showSplashScreen}
					contentLabel="Welcome Screen"
					className="welcome"
				>
					<h3>Welcome to Truebird</h3>
					<p> *Insert Awesome Splash Screen Here</p>
					<button onClick={this.fakeSwipe.bind(this)}>Virtual Card Swipe</button>
					<p>OR</p>
					<button onClick={this.closeSplashScreen.bind(this)}>Browse</button>
					<p>to begin</p>

				</ReactModal>
				<div className="container">
					<div />
					<ConstructedDrink
						selection={this.state.selection}
						options={this.state.options}
						submitOrder={this.openPayment.bind(this)}
						changeMilkSlider={this.changeMilkSlider.bind(this)}
						milkLevel={this.state.milkLevel}
						toggleMilk={this.toggleMilk.bind(this)}
					/>
					<div className="selectorContainer">
						<DrinkSelector drinkSelection={this.state.selection.drink} drinks={this.state.options.drinks} changeDrink={this.changeDrink.bind(this)} />
						<div className='bottomrow'>
							<BeanSelector beanSelection={this.state.selection.bean} beans={this.state.options.beans} changeBean={this.changeBean.bind(this)} />
							<MilkSelector milkSelection={this.state.selection.milk} milk={this.state.options.milk} changeMilk={this.changeMilk.bind(this)} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}