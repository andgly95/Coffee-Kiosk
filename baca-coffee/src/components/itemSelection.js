import React from 'react';


const ItemSelection = ({option, selection, type, onSelect}) => {

	let statusClass = "item";
	if (option.id === selection) statusClass += " itemSelected";
	if (selection === 'select' || selection === 'required') statusClass += " item-Choose";
	if (selection === 'disabled') statusClass += " itemInvalid transparent";
	if (type === "drink") statusClass += " item-Drink";
	if (type === "add") statusClass += " item-Add";

	const image = option.image ? option.image : "";
	return (
		<div className={statusClass} onClick={() => onSelect(option.id)}>
			<img src={image} alt={option.name} />
		</div>
	);
}

export default ItemSelection;
