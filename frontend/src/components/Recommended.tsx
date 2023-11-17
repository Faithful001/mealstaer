import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { URL } from "../utils/methods/url/URL";

const Recommended = () => {
	const prodURL = URL.prodURL;
	const [allMeals, setAllMeals] = useState<object[]>([]);
	const [randomMeals, setRandomMeals] = useState<object[]>([]);
	const mealLabels: string[] = ["Breakfast", "Lunch", "Supper", "Dinner"];

	useEffect(() => {
		const stringifiedData = JSON.stringify(allMeals);
		localStorage.setItem("recommended meals", stringifiedData);
	}, [allMeals]);

	const getCurrentTime = () => {
		const now = new Date();
		return now.getHours() * 60 + now.getMinutes(); // Convert time to minutes
	};

	const getLastUpdateTime = () => {
		return parseInt(localStorage.getItem("lastUpdateTime") || "0", 10);
	};

	const setLastUpdateTime = (time: number) => {
		localStorage.setItem("lastUpdateTime", time.toString());
	};

	const getRandomMeals = () => {
		if (allMeals.length > 4) {
			const shuffledMeals = [...allMeals].sort(() => 0.5 - Math.random());
			const selectedMeals = shuffledMeals.slice(0, 4);
			setRandomMeals(selectedMeals);
			setLastUpdateTime(getCurrentTime());
			localStorage.setItem("randomMeals", JSON.stringify(selectedMeals));
		}
	};

	useEffect(() => {
		const getMeals = async () => {
			try {
				const response = await axios.get(`${prodURL}/api/data/`, {
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				});
				const personalizedResponse = await axios.get(
					`${prodURL}/api/personalized`,
					{
						withCredentials: true,
						headers: {
							"Access-Control-Allow-Origin": "*",
						},
					}
				);
				const all_meals = [...response.data, ...personalizedResponse.data];
				setAllMeals(all_meals);
			} catch (error: any) {
				console.log(error?.message);
			}
		};

		getMeals();
	}, []); // Empty dependency array to run only once

	useEffect(() => {
		const storedRandomMeals = localStorage.getItem("randomMeals");
		if (storedRandomMeals) {
			setRandomMeals(JSON.parse(storedRandomMeals));
		} else {
			getRandomMeals(); // Initial random meals
		}
	}, [allMeals]); // Watch changes in allMeals and update randomMeals accordingly

	useEffect(() => {
		// Set interval to check and update at precisely 5 am
		const intervalId = setInterval(() => {
			const currentTime = getCurrentTime();
			if (
				currentTime >= 300 &&
				currentTime < 305 &&
				getLastUpdateTime() !== currentTime
			) {
				getRandomMeals();
			}
		}, 60000);

		// Clean up the interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="recommended p-5">
			<div className="section">
				<div className=" mb-5">
					<span
						className={
							"bg-white text-black rounded-3xl p-2 px-4 text-sm"
							// onClick={() => switchToByYou()}
						}
					>
						Recommended
					</span>
				</div>
				{randomMeals.length > 0 && randomMeals ? (
					<div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-white mt-8">
						{randomMeals.map((meal: any, index: number) => (
							<div
								key={meal._id}
								className="bg-[#424242] rounded-lg p-5 px-20 py-10 flex justify-center items-center relative"
							>
								<Link to={`/user/recommended/${meal._id}`}>
									<div className="">
										<p className="absolute top-4 left-4 text-xs font-light">
											{mealLabels[index]}
										</p>
										<h2 className="text-xl mb-3">{meal.name}</h2>
									</div>
								</Link>
							</div>
						))}
					</div>
				) : (
					<div>Meal not found</div>
				)}
			</div>
		</div>
	);
};

export default Recommended;
