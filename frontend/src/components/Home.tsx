import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useMeal } from "../contexts/MealContext";
// import { useFavorite } from "../contexts/FavoriteContext";
import wave from "../assets/wave1.png";
import { MealsType } from "../contexts/MealContext";

import favoritee from "../assets/favorite.svg";
import favorite_black from "../assets/favorite_black.svg";
import turned_in from "../assets/turned_in.svg";
import turned_in_black from "../assets/turned_in_black.svg";
// import { IndexedDB } from "../utils/methods/IndexedDB";
import { useFavorite } from "../contexts/FavoriteContext";

const Home = () => {
	const [user_name, setUsername] = useState("");
	const [meals, setMeals] = useState<MealsType[]>([]);
	const [fetchError, setFetchError] = useState<any>(null);
	const {
		searchValue,
		setSearchValue = () => {},
		setValue = () => {},
	} = useMeal();

	//server states
	// const [favorite_id, setFavoritedId] = useState("");
	// const [favorite_name, setFavoritedName] = useState("");
	// console.log(favorite_id);

	//heart and saved states
	const [favorited, setFavorited] = useState(false);
	const [saved, setSaved] = useState(false);

	//favorited states
	// const { favorites, setFavorites } = useFavorite();

	//forYou and byYou states
	const [forYou, setForYou] = useState(true);
	const [byYou, setByYou] = useState(false);
	//all states end

	//funtions & methods start
	async function fetchData() {
		try {
			const response = await axios.get("http://localhost:4000/api/data", {
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			});
			console.log(response.data);
			return response.data;
		} catch (error: any) {
			setFetchError(`Something went wrong, ${error.message}`);
			console.log(`Something went wrong, ${error.message}`);
		}
	}

	const { isLoading, error, data } = useQuery("meals", fetchData, {
		enabled: Boolean(meals),
	});
	console.log(isLoading);

	useEffect(() => {
		if (data) {
			setMeals(data);
			setFetchError(null);
			setValue(data);
			setSearchValue([]);
		}
	}, [data]);

	useEffect(() => {
		if (Array.isArray(searchValue) && searchValue.length > 0) {
			setMeals([]);
		}
	}, [searchValue]);

	//addToFavorites function
	async function addToFavorites(meal: MealsType) {
		// setFavorited(true);
		try {
			const body = {
				name: meal.name,
				ingredients: meal.ingredients,
				steps: meal.steps,
				favorited: true,
			};
			const response = await axios.post(
				"http://localhost:4000/api/fave/",
				body,
				{
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
			// setFavoritedId(response.data._id);
			// setFavoritedName(response.data.name);
			console.log(response.data);
			localStorage.setItem(`fave ${meal._id}`, "true");
			// localStorage.setItem(`fave ${meal.name}`, JSON.stringify(response.data));
		} catch (error) {
			console.log("Problem adding to fave");
		}
	}

	// useEffect(() => {
	// 	async function favorite() {
	// 		try {
	// 			const response = await axios.get(
	// 				`http://localhost:4000/api/fave/${favorite_id}`,
	// 				{
	// 					withCredentials: true,
	// 					headers: {
	// 						"Access-Control-Allow-Origin": "*",
	// 					},
	// 				}
	// 			);
	// 			console.log(response.data.favorited);
	// 			// response.dat
	// 		} catch (error) {
	// 			console.log("Problem adding to fave");
	// 			// if (error) {
	// 			// 	setFavorited(false);
	// 			// }
	// 		}
	// 	}
	// }, []);

	// removeFromFavorite function
	async function removeFromFavorites(meal: MealsType) {
		// setFavorited(false);
		const faveData = localStorage.getItem(`fave ${meal.name}`);
		const parsedData = faveData && JSON.parse(faveData);
		// console.log(faveData);
		try {
			// const body = { _id: meal._id };
			const response = await axios.delete(
				`http://localhost:4000/api/fave/${parsedData._id}`,
				{
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
			console.log(response.data);
			// console.log(favorite_id);
			localStorage.removeItem(`fave ${meal.name}`);
		} catch (error) {
			console.log(error);
		}
	}

	//addToSaved function
	// async function addToSaved(meal: MealsType) {
	// 	try {
	// 		const body = {
	// 			name: meal.name,
	// 			ingredients: meal.ingredients,
	// 			steps: meal.steps,
	// 		};
	// 		const response = await axios.post(`http://localhost:4000/api/save`, body);
	// 		console.log(response);
	// 		console.log(meal._id);
	// 	} catch (error) {
	// 		console.log("Problem adding to fave");
	// 	}
	// }

	// removeFromSaved function
	// async function removeFromSaved(meal: MealsType) {
	// 	setSaved((prevSaved) => {
	// 		const newSet = new Set(prevSaved);
	// 		newSet.delete(meal);
	// 		return newSet;
	// 	});
	// }

	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			const userObject = JSON.parse(user);
			const user_name = userObject.user_name;
			const firstName = user_name.split(" ")[0];
			setUsername(firstName);
		}
	}, []);

	//switchToForYou fuunction
	function switchToForYou() {
		setForYou(true);
		setByYou(false);
	}
	//switchToByYou fuunction
	function switchToByYou() {
		setByYou(true);
		setForYou(false);
	}

	return (
		<div className="home">
			<div className="section p-5">
				<div className="mb-10">
					<div className="flex items-start">
						<h1 className="text-2xl font-semibold text-white mb-2 mr-2">
							Welcome, {user_name}
						</h1>
						<img src={wave} alt="" className="h-8" />
					</div>
					<span className="">What are we preparing today?</span>
				</div>
				<span
					className={`${
						forYou ? "bg-white text-black" : "border-white border-2 text-white"
					} rounded-3xl p-2 px-4 cursor-pointer text-sm`}
					onClick={switchToForYou}
				>
					For You
				</span>
				<span
					className={`${
						byYou ? "bg-white text-black" : "border-white border-2 text-white"
					} rounded-3xl p-2 px-4 cursor-pointer text-sm ml-3`}
					onClick={switchToByYou}
				>
					By You
				</span>

				{meals && forYou ? (
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white mt-8">
						{meals.map((meal: MealsType) => (
							<div key={meal._id} className="bg-[#424242] rounded-lg p-5">
								<Link to={`/user/meal/${meal._id}`}>
									<div className="">
										<h2 className="text-xl mb-3">{meal.name}</h2>
									</div>
								</Link>
								<div className="-mb-2 flex">
									{/* Check if meal is favorited and render the appropriate button */}
									{localStorage
										.getItem(`fave ${meal._id}`)
										?.includes("true") ? (
										<img
											src={favoritee}
											alt=""
											className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
											onClick={() => addToFavorites(meal)}
										/>
									) : (
										<img
											src={favorite_black}
											alt=""
											className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
											onClick={() => removeFromFavorites(meal)}
										/>
									)}
									{!saved ? (
										<img
											src={turned_in}
											alt=""
											className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
											// onClick={() => addToSaved(meal)}
										/>
									) : (
										<img
											src={turned_in_black}
											alt=""
											className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
											// onClick={() => removeFromSaved(meal)}
										/>
									)}
								</div>
							</div>
						))}
					</div>
				) : error ? (
					<div className="text-red font-medium text-2xl">{fetchError}</div>
				) : (
					<div>loading...</div>
				)}
			</div>
		</div>
	);
};

export default Home;
