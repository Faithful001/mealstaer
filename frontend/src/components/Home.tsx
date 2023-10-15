import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useMeal } from "../contexts/MealContext";
// import { useMeal } from "../contexts/MealContext";

type MealsType = {
	id: number;
	name: string;
	image_url: string;
	ingredients: string[];
	steps: string[];
};

const Home = () => {
	const [meals, setMeals] = useState<MealsType[]>([]);
	const [fetchError, setFetchError] = useState<any>(null);
	const { value, notValue } = useMeal();

	console.log(value);
	console.log(meals);
	console.log(fetchError);

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
				{meals ? (
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
						{meals.map((meal: MealsType) => (
							<Link to={`/meal/${meal.id}`} key={meal.id}>
								<div className="">
									<div className="rounded-lg bg-[#424242] p-5">
										<h2 className="text-2xl font-bold">{meal.name}</h2>
										<img src={meal.image_url} alt={meal.name} />
									</div>
								</div>
							</Link>
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
							<Link to={`/meal/${meal.id}`} key={meal.id}>
								<div className="">
									<div className="rounded-lg bg-[#424242] p-5">
										<h2 className="text-2xl">{meal.name}</h2>
										<img src={meal.image_url} alt={meal.name} />
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
