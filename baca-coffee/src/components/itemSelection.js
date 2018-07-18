import React from 'react';


const ItemSelection = ({option, selection, onSelect}) => {

	let statusClass = "item";
	if (option.id === selection) statusClass += " itemSelected";
	if (selection === 'select' || selection === 'required') statusClass += " item-Choose";
	if (selection === 'disabled') statusClass += " itemInvalid transparent";

	const image = option.image ? option.image : "";
	return (
		<div className={statusClass} onClick={() => onSelect(option.id)}>
			<img src={image} width={200} height={200} alt={option.name} />
		</div>
	);
}

export default ItemSelection;
