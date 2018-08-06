import React, { Component } from 'react';
import DrinkSelector from './components/drinkSelector';
import BeanSelector from './components/beanSelector';
import MilkSelector from './components/milkSelector';
import ConstructedDrink from './components/constructedDrink';
import ConfirmationScreen from './components/confirmationScreen';
import { StyleSheet, css } from 'aphrodite';
import ReactModal from 'react-modal';
import axios from 'axios';

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

require('./App.css');

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: {
				drinks: [
					{
						name: "espresso",
						status: 1,
						addMilk: false,
						image: require('./resources/d_Espresso.png'),
						id: 0
					},
					{
						name: "americano",
						status: 1,
						addMilk: false,
						image: require('./resources/d_Americano.png'),
						id: 1
					},
					{
						name: "cappuccino",
						status: 1,
						addMilk: true,
						image: require('./resources/d_Cappuccino.png'),
						id: 2
					},
					{
						name: "latte",
						status: 1,
						addMilk: true,
						image: require('./resources/d_Latte.png'),
						id: 3
					}
				],
				beans: [
					{
						name: "Stumptown Hair Bender",
						status: 1,
						image: require('./resources/b_Stumptown_Hair-Bender.png'),
						id: 4
					},
					{
						name: "Sey Ivan Molano Colombia",
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

	callVoiceToText() {
		{

			fetch('http://localhost:3002/api/speech-to-text/token')
			.then((response) =>{
				return response.text();
			}).then((token) => {
		
			  console.log(token)
			  var stream = recognizeMic({
				  token: token,
				  objectMode: true, // send objects instead of text
				  extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
				  format: false, // optional - performs basic formatting on the results such as capitals an periods
				  keywords: ['espresso','americano','latte','cappuccino', 'almond','whole','say','Stumptown'],
				  keywords_threshold: .3
			  });
			  /**
			   * Prints the users speech to the console
			   * and assigns the text to the state.
			   */
			  stream.on('data',(data) => {
				let voiceWord = data.alternatives[0].transcript;
				if (voiceWord.includes('espresso')) this.changeDrink(0);
				if (voiceWord.includes('Americano')||voiceWord.includes('americana')||voiceWord.includes('American')) this.changeDrink(1);
				if (voiceWord.includes('cappuccino')) this.changeDrink(2);
				if (voiceWord.includes('latte')) this.changeDrink(3);
				if (voiceWord.includes('Stumptown')) this.changeBean(4);
				if (voiceWord.includes('say')) this.changeBean(5);
				if (voiceWord.includes('whole')) this.changeMilk(6);
				if (voiceWord.includes('almond')) this.changeMilk(7);
				if (voiceWord.includes('confirm')) this.openPayment();
				if (voiceWord.includes('order')) this.submitOrder();

				console.log(voiceWord);
				}
		
				// console.log(data.alternatives[0].transcript)
			  );
			  stream.on('error', function(err) {
				  console.log(err);
			  });
			  document.querySelector('#stop').onclick = stream.stop.bind(stream);
			}).catch(function(error) {
				console.log(error);
			});
		  };
		// let voiceFile = require('./resources/Untitled.flac');
		// axios({
		// 	url: "https://stream.watsonplatform.net/speech-to-text/api/v1/recognize",
		// 	method: 'post',
		// 	// auth: {
		// 		username: "aa5d42a1-9bb3-4811-beb9-a70884873a3f",
		// 		password: "pqlvOaq2uVGO",
		// 	// },
		// 	headers: {
		// 		"Content-Type": "audio/flac"
		// 	},
		// 	body: voiceFile
		// }).then(function(response) {
		// 	console.log(response.data);
		// 	console.log(response.status);
		// 	console.log(response.statusText);
		// 	console.log(response.headers);
		// 	console.log(response.config);
		//   });
		
	}

	render() {
		return (
			<div className={css(styles.container)}>
				<div className={css(styles.logo)}>
					<img src={require('./resources/logoWhite.png')} width='100%' />
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

					<ReactModal
						isOpen={this.state.showSplashScreen}
						contentLabel="Welcome Screen"
						className={css(styles.welcome)}
					>
						<div>
							<div className="welcometext"><b>Welcome to Truebird</b></div>
							<div className="welcometext">*Insert Awesome Splash Screen Here</div>
							<button className={css(styles.welcomeButton)} onClick={this.fakeSwipe.bind(this)}>Virtual Card Swipe</button>
							<div className="welcometext">OR</div>
							<button className={css(styles.welcomeButton)} onClick={this.closeSplashScreen.bind(this)}>Browse</button>
							<div className="welcometext">to begin</div>
						</div>

					</ReactModal>

					<ConstructedDrink
						selection={this.state.selection}
						options={this.state.options}
						submitOrder={this.callVoiceToText.bind(this)}
						changeMilkSlider={this.changeMilkSlider.bind(this)}
						milkLevel={this.state.milkLevel}
						toggleMilk={this.toggleMilk.bind(this)}
					/>
					
					<div className={css(styles.selectorContainer)}>
					<div className={css(styles.voiceText)} onClick={this.callVoiceToText.bind(this)}>Click to Voice Order</div>
						<DrinkSelector drinkSelection={this.state.selection.drink} drinks={this.state.options.drinks} changeDrink={this.changeDrink.bind(this)} />
						<div className={css(styles.bottomRow)}>
							<BeanSelector beanSelection={this.state.selection.bean} beans={this.state.options.beans} changeBean={this.changeBean.bind(this)} />
							<MilkSelector milkSelection={this.state.selection.milk} milk={this.state.options.milk} changeMilk={this.changeMilk.bind(this)} />
						</div>
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
		gridTemplateRows: '10% 90%',
		justifyItems: 'center',
		marginTop: '5%',
		paddingLeft: '5%',
		paddingRight: '5%'
	},
	App: {
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
		backgroundImage: require('./resources/logoWhite.png'),
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
	voiceText: {
		color: 'black',
		fontSize: 12,
		backgroundColor: '#8D6E63',
	},
	welcome: {
		textAlign: 'center',
		margin: '10%',
		marginTop: '10%',
		border: '3px solid black',
		borderRadius: '2.5vw',
		backgroundColor: '#8D6E63',
		'@media (orientation: portrait)': {
			fontSize: '5vw'
		},
		'@media (orientation: landscape)': {
			fontSize: '2.5vw'
		}
	},
	welcomeButton: {
		padding: '3%',
		borderRadius: '2.5vw',
		'@media (orientation: portrait)': {
			fontSize: '4vw'
		},
		'@media (orientation: landscape)': {
			fontSize: '2vw'
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