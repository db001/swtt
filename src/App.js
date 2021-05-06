import React, { useState, useEffect } from "react";
import axios from "axios";
// import Card from "./Card";

function App() {
	// const [results, setResults] = useState([]);
	const [api, setApi] = useState({
		url: "https://swapi.dev/api/starships/",
		isLoading: true,
		isError: false,
	});
	const [cards, setCards] = useState({
		allCards: [],
		playerHand: [],
		botHand: [],
		playerCurrent: {},
		botCurrent: {},
	});

	// const createHands = async (arr) => {
	// 	const shuffled = await shuffleArray(results.slice(0));
	// 	const halfway = Math.ceil(shuffled.length / 2);
	// 	setCards({
	// 		...cards,
	// 		playerHand: shuffled.slice(0, halfway),
	// 		botHand: shuffled.slice(halfway),
	// 		playerCurrent: shuffled[0],
	// 		botCurrent: shuffled[halfway + 1],
	// 	});
	// };

	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		return array;
	};

	// const compareCards = (attribute) => {
	// 	console.log(playerCurrent[attribute]);
	// 	console.log(botCurrent[attribute]);
	// };

	useEffect(() => {
		async function fetchData() {
			if (!api.url) {
				return;
			}
			try {
				const response = await axios(api.url);
				const res = response.data.results;

				setCards((prevState) => {
					return {
						...prevState,
						allCards: [...prevState.allCards, ...res],
					};
				});

				if (response.data.next) {
					setApi({ ...api, url: response.data.next.replace(/http:/g, "https:") });
				} else {
					setApi({ ...api, url: null, isLoading: false });
				}
			} catch (error) {
				setApi({ ...api, isError: true });
			}
		}

		fetchData();

		// function checkCardsLength() {
		// 	if (results.length === cards.totalCards) {
		// 		createHands();
		// 	}
		// }

		// checkCardsLength();
	}, [api]);

	return (
		<div>
			{api.isLoading ? (
				<p>Fetching Data</p>
			) : (
				<div>
					{/* <p>{results.length}</p> */}
					{/* <p>{cards.playerHand.length}</p>
					<Card card={results[0]} /> */}
					{/* <div> */}
					{/* <button onClick={() => compareCards("cost_in_credits")}>Cost</button>
						<button onClick={() => compareCards("length")}>Length</button>
						<button onClick={() => compareCards("max_atmosphering_speed")}>Max speed</button>
						<button onClick={() => compareCards("hyperdrive_rating")}>Hyperdrive</button>
						<button onClick={() => compareCards("cargo_capacity")}>Cargo Capacity</button> */}
					{/* </div>*/}
					{/* <p>{cards.botHand.length}</p>
					<Card card={results[1]} /> */}
				</div>
			)}
		</div>
	);
}

export default App;
