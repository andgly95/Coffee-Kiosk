import React from 'react';
import { StyleSheet, css } from 'aphrodite';


const ItemSelection = ({option, selection, type, onSelect}) => {

	let buttonStyle = styles.item;
	let selected = (option.id === selection)? 1:0;

	let chooseButton = (selection === 'select' || selection === 'required')? 1:0;
	let disabled = (selection === 'disabled')? 1:0;
	let drink = (type==='drink')? 1:0;

	const image = option.image ? option.image : "";
	return (
		<div 
			className={css(
			buttonStyle, 
			(selected && styles.itemSelected), 
			(chooseButton && styles.itemChoose), 
			(disabled && styles.itemInvalid),
			(drink && styles.drinkSize)
			)} onClick={() => onSelect(option.id)}>
			<img src={image} width={'100%'} height={'100%'} alt={option.name} />
		</div>
	);
}

const styles = StyleSheet.create({
	item: {
		margin: '1%',
		width: '100%',
		background: '#ADA996',
		background: 'radial-gradient(#EAEAEA, #DBDBDB, #F2F2F2 25%, #ADA996 )',
		borderRadius: '15%',
		boxSizing: 'border-box',
		transition: 500
	},
	itemChoose: {
		borderColor: 'crimson',
		borderWidth: 3,
		borderStyle: 'solid',
		transition: 500
	},
	itemSelected: {
		background: 'rgb(125, 195, 238)',  /* fallback for old browsers */
		background: 'radial-gradient(#E4E5E6, rgb(115, 177, 130))'
	},
	itemInvalid: {
		background: 'rgb(125, 128, 129)',
		background: 'radial-gradient(#E4E5E6, rgb(125, 128, 129))',
		pointerEvents: 'none'
	},
	drinkSize: {
		width: '22%'
	},
	transparent: {
		opacity: .4
	}
})


export default ItemSelection;
