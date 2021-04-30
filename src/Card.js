import React from "react";

const Card = ({ card }) => {
	return (
		<div>
			<h4>{card.name}</h4>
			<ul>
				<li>Cost: {card.cost_in_credits}</li>
				<li>Length: {card.length}</li>
				<li>Max speed: {card.max_atmosphering_speed}</li>
				<li>Hyperdrive: {card.hyperdrive_rating}</li>
				<li>Cargo capacity: {card.cargo_capacity}</li>
			</ul>
		</div>
	);
};

export default Card;
