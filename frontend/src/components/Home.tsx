// import { ObjectId } from "mongodb";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useMeal } from "../contexts/MealContext";
import { useFavorite } from "../contexts/FavoriteContext";
import chef_hat from "../assets/chef_hat.png";
import { MealsType } from "../contexts/MealContext";

import favoritee from "../assets/favorite.svg";
import favorite_black from "../assets/favorite_black.svg";
import turned_in from "../assets/turned_in.svg";
import turned_in_black from "../assets/turned_in_black.svg";

const Home = () => {
	const [meals, setMeals] = useState<MealsType[]>([]);
	const [fetchError, setFetchError] = useState<any>(null);
	const {
		searchValue,
		setSearchValue = () => {},
		setValue = () => {},
	} = useMeal();

	const {
		favorited,
		setFavorited = () => {},
		saved,
		setSaved = () => {},
	} = useFavorite();

	// Maintain a state for favorited meals
	// const [favorited, setFavorited] = useState<Set<string>>(new Set());
	// const [saved, setSaved] = useState<Set<string>>(new Set());
	// console.log(favorited);
	// console.log(saved);

	async function fetchData() {
		try {
			const response = await axios.get("http://localhost:4000/api/data");
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

	async function addToFavorites(meal: MealsType) {
		try {
			const body = {
				name: meal.name,
				ingredients: meal.ingredients,
				steps: meal.steps,
			};
			const response = await axios.post(`http://localhost:4000/api/fave`, body);
			console.log(response);
			console.log(meal._id);
		} catch (error) {
			console.log("Problem adding to fave");
		}

		// Update the favorited state
		// setFavorited((prevFavorited) => {
		// 	const newSet = new Set(prevFavorited);
		// 	newSet.add(meal);
		// 	return newSet;
		// });
	}

	async function removeFromFavorites(meal: MealsType) {
		// try {
		// 	const body = { favorited: false };
		// 	const response = await axios.patch(
		// 		`http://localhost:4000/api/data/${meal._id}`,
		// 		body
		// 	);
		// 	console.log(response);
		// 	console.log(meal._id);

		// Update the favorited state
		setFavorited((prevFavorited) => {
			const newSet = new Set(prevFavorited);
			newSet.delete(meal);
			return newSet;
		});
		// } catch (error) {
		// 	console.log("Problem removing from fave");
		// }
	}

	async function addToSaved(meal: MealsType) {
		try {
			// const response = await axios.patch();
		} catch (error) {
			console.log(error);
		}
		setSaved((prevSaved) => {
			const newSet = new Set(prevSaved);
			newSet.add(meal);
			return newSet;
		});
	}

	async function removeFromSaved(meal: MealsType) {
		setSaved((prevSaved) => {
			const newSet = new Set(prevSaved);
			newSet.delete(meal);
			return newSet;
		});
	}

	return (
		<div className="home">
			<div className="section p-5">
				<div className="flex items-start">
					<h1 className="text-3xl font-bold text-white mb-10 mr-2">
						Welcome, chef
					</h1>
					<img src={chef_hat} alt="" className="h-10" />
				</div>
				{meals ? (
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
						{meals.map((meal: MealsType) => (
							<div key={meal._id} className="bg-[#424242] rounded-lg p-5">
								<Link to={`/user/meal/${meal._id}`}>
									<div className="">
										<h2 className="text-xl mb-3">{meal.name}</h2>
									</div>
								</Link>
								<div className="-mb-2 flex">
									{/* Check if meal is favorited and render the appropriate button */}
									{!favorited?.has(meal) ? (
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
									{!saved?.has(meal) ? (
										<img
											src={turned_in}
											alt=""
											className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
											onClick={() => addToSaved(meal)}
										/>
									) : (
										<img
											src={turned_in_black}
											alt=""
											className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
											onClick={() => removeFromSaved(meal)}
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
