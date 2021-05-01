import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

function Vehicles() {
	const [results, setResults] = useState([]);
	const [api, setApi] = useState({
		url: "https://swapi.dev/api/starships/",
		isLoading: true,
		isError: false,
	});
	const [cards, setCards] = useState({
		playerHand: [],
		botHand: [],
		playerCurrent: {},
		botCurrent: {},
	});
	// const [url, setUrl] = useState("https://swapi.dev/api/starships/");
	// const [playerHand, setPlayerHand] = useState([]);
	// const [botHand, setBotHand] = useState([]);
	// const [playerCurrent, setPlayerCurrent] = useState({});
	// const [botCurrent, setBotCurrent] = useState({});
	// const [isLoading, setIsLoading] = useState(true);

	const createHands = async () => {
		const shuffled = await shuffleArray(results.slice(0));
		const halfway = Math.ceil(shuffled.length / 2);
		setCards({
			...cards,
			playerHand: shuffled.slice(0, halfway),
			botHand: shuffled.slice(halfway + 1),
			playerCurrent: shuffled[0],
			botCurrent: shuffled[halfway + 1],
		});
	};

	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		return array;
	};

	const compareCards = (attribute) => {
		console.log(cards.playerCurrent[attribute]);
		console.log(cards.botCurrent[attribute]);
	};

	useEffect(() => {
		async function fetchData() {
			if (!api.url) {
				return;
			}
			try {
				const res = await axios(api.url);
				const results = res.data.results;
				setResults((prevState) => {
					return [...prevState, ...results];
				});

				if (res.data.next) {
					setApi({
						...api,
						url: res.data.next.replace(/http:/g, "https:"),
					});
				} else {
					setApi({ ...api, url: null, isLoading: false });
					createHands();
				}
			} catch (error) {
				setApi({ ...api, isError: true });
			}
		}

		fetchData();

		// if (!url) {
		// 	setIsLoading(false);
		// 	createHands();
		// }

		// if (playerHand.length > 0 && botHand.length > 0) {
		// 	setPlayerCurrent(playerHand[0]);
		// 	setBotCurrent(botHand[0]);
		// }
	}, [api]);

	return (
		<div>
			{api.isLoading ? (
				<p>Fetching Data</p>
			) : (
				// <p>Loaded</p>
				<div>
					<Card card={cards.playerCurrent} />
					<div>
						<button onClick={() => compareCards("cost_in_credits")}>
							Cost
						</button>
						<button onClick={() => compareCards("length")}>
							Length
						</button>
						<button
							onClick={() =>
								compareCards("max_atmosphering_speed")
							}>
							Max speed
						</button>
						<button
							onClick={() => compareCards("hyperdrive_rating")}>
							Hyperdrive
						</button>
						<button onClick={() => compareCards("cargo_capacity")}>
							Cargo Capacity
						</button>
					</div>
					<Card card={cards.botCurrent} />
				</div>
			)}
		</div>
	);
}

export default Vehicles;
