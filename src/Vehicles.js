import React, { useState, useEffect } from "react";
import axios from "axios";

function Vehicles() {
	const [vehicles, setVehicles] = useState([]);
	const [url, setUrl] = useState("https://swapi.dev/api/starships/");

	useEffect(() => {
		async function fetchData() {
			const res = await axios(url);
			const results = res.data.results;
			setVehicles((prevState) => {
				return [...prevState, ...results];
			});

			if (res.data.next) {
				setUrl(res.data.next);
			}
		}

		fetchData();
	}, [url]);

	return (
		<div>
			<ul>
				{vehicles.map((vehicle, i) => {
					return (
						<li key={i}>
							<h4>{vehicle.name}</h4>
							<div>
								<span>Cost: {vehicle.cost_in_credits}</span>&nbsp;&nbsp;&nbsp;
								<span>Length: {vehicle.length}</span>&nbsp;&nbsp;&nbsp;
								<span>Max speed: {vehicle.max_atmosphering_speed}</span>&nbsp;&nbsp;&nbsp;
								<span>Hyperdrive: {vehicle.hyperdrive_rating}</span>&nbsp;&nbsp;&nbsp;
								<span>Cargo capacity: {vehicle.cargo_capacity}</span>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Vehicles;
