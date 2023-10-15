import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useMeal } from "../contexts/MealContext";
import chef_hat from "../assets/chef_hat.png";
import favorite from "../assets/favorite.svg";
import favorite_black from "../assets/favorite_black.svg";
import turned_in from "../assets/turned_in.svg";
import turned_in_black from "../assets/turned_in_black.svg";
// import { useMeal } from "../contexts/MealContext";

type MealsType = {
	id: number;
	name: string;
	image_url: string;
	ingredients: string[];
	steps: string[];
	favorited: boolean;
	saved: boolean;
};

const Home = () => {
	const [meals, setMeals] = useState<MealsType[]>([]);
	const [fetchError, setFetchError] = useState<any>(null);
	const { value, notValue } = useMeal();
	const [favorites, setFavorites] = useState<Set<MealsType>>(new Set());
	// const [saveForLater, setSaveForLater] = useState(new Set());
	const [fave, setFave] = useState<boolean>(false);

	console.log(fave);

	console.log(favorites);

	// console.log(fave);
	// console.log(save);

	console.log(value);
	console.log(meals);
	console.log(fetchError);

	const addToFavorites = (meal: MealsType) => {
		setFavorites((prevFavorites) => {
			const newSet = new Set(prevFavorites);
			newSet.add(meal);
			return newSet;
		});
	};

	const removeFromFavorites = (meal: MealsType) => {
		setFavorites((prevFavorites) => {
			const newSet = new Set(prevFavorites);
			newSet.delete(meal);
			return newSet;
		});
	};

	// function handleSave() {
	// 	setSave(!save);
	// }

	useEffect(() => {
		if (value) {
			setMeals([]);
		}
	}, [value]);

	async function fetchData() {
		try {
			const response = await axios.get("http://localhost:8080/api/data");
			// console.log(response.data);
			return response.data;
		} catch (error: any) {
			setFetchError(`Somthing went wrong, ${error.message}`);
			// console.log(`Somthing went wrong, ${error.message}`);
			// throw new Error();
		}
	}

	const { isLoading, error, data } = useQuery("meals", fetchData, {
		enabled: Boolean(meals),
	});
	useEffect(() => {
		if (data) {
			setMeals(data.meals);
			setFetchError([]);
		}
		localStorage.setItem("meals", JSON.stringify(data?.meals));
	}, [data]);
	console.log(isLoading);
	console.log(error);

	console.log(notValue);

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
							<div key={meal.id} className="bg-[#424242] rounded-lg p-5">
								<Link to={`/meal/${meal.id}`}>
									<div className="">
										<h2 className="text-xl mb-3">{meal.name}</h2>
										{/* <img src={meal.image_url} alt={meal.name} /> */}
									</div>
								</Link>
								<div className="-mb-2 flex">
									<img
										src={favorite}
										alt=""
										className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
										onClick={() => addToFavorites(meal)}
									/>

									<img
										src={favorite_black}
										alt=""
										className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
										onClick={() => removeFromFavorites(meal)}
									/>

									{/* {!save ? (
									// 	<img
									// 		src={turned_in}
									// 		alt=""
									// 		className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
									// 		onClick={handleSave}
									// 	/>
									// ) : (
									// 	<img
									// 		src={turned_in_black}
									// 		alt=""
									// 		className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
									// 		onClick={handleSave}
									// 	/>
									// )} */}
								</div>
							</div>
						))}
					</div>
				) : error ? (
					<div className="text-red font-medium text-2xl">{fetchError}</div>
				) : (
					<div>loading...</div>
				)}
				{Array.isArray(value) && value.length > 0 ? (
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
						{value.map((meal: MealsType) => (
							<Link
								to={`/meal/${meal.id}`}
								key={meal.id}
								className="bg-[#424242] rounded-lg p-5"
							>
								<div className="">
									<h2 className="text-xl mb-3">{meal.name}</h2>
									{/* <img src={meal.image_url} alt={meal.name} /> */}
									<div className="-mb-2">
										<span className="material-symbols-outlined text-white">
											favorite
										</span>
										<span className="material-symbols-outlined text-white">
											bookmark
										</span>
									</div>
								</div>
							</Link>
						))}
					</div>
				) : Array.isArray(value) && value.length < 1 ? (
					<div className="text-red font-medium text-2xl">Meal not found</div>
				) : (
					<div>loading...</div>
				)}
			</div>
		</div>
	);
};

export default Home;
