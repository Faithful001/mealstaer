import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
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
	const [fetchError, setFetchError] = useState<any>("");
	console.log(meals);
	console.log(fetchError);

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
	// fetchData();
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

	return (
		<div className="home">
			<div className="section m-5">
				{
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
						{meals.map((meal: MealsType) => (
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
				}
			</div>
		</div>
	);
};

export default Home;
