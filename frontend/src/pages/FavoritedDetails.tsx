import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useMeal } from "../contexts/MealContext";
import { MealsType } from "../contexts/MealContext";
import axios from "axios";
import { useQuery } from "react-query";
import { URL } from "../utils/methods/url/URL";

const FavoriteDetails = () => {
	const prodURL = URL.prodURL;
	const navigate = useNavigate();
	const [meal, setMeal] = useState<MealsType[]>([]);
	// const { value } = useMeal();
	console.log(meal);
	// const [fetchError, setFetchError] = useState<any>(null);
	let { id } = useParams();

	async function fetchData() {
		try {
			const response = await axios.get(`${prodURL}/api/fave/${id}`, {
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			});
			console.log(response.data);
			return [response.data];
		} catch (error: any) {
			if (error.response.status == 401) {
				navigate("/login");
			} else {
				console.log(`Something went wrong, ${error.message}`);
			}
		}
	}

	const { isLoading, error, data } = useQuery("meals", fetchData, {
		enabled: Boolean(meal),
	});
	console.log(isLoading);

	useEffect(() => {
		if (data) {
			setMeal(data);
		}
	}, [data]);

	// useEffect(() => {
	// 	// const mealData = localStorage.getItem("meals");

	// 	if (value) {
	// 		const matchingMeals = value.find(
	// 			(item: any) => item._id?.toString() === id
	// 		);
	// 		console.log(matchingMeals);
	// 		setMeal(matchingMeals);
	// 	}
	// }, [id]);

	function handleBack(e: React.FormEvent<HTMLSpanElement>) {
		e.preventDefault();
		navigate("/user/favorite");
	}

	return (
		<div className="meal-details p-7">
			<div className="section">
				<div>
					<span
						className="material-symbols-outlined mb-5 p-2 cursor-pointer hover:cursor-pointer rounded-3xl hover:bg-[#e4e4e42c]"
						onClick={handleBack}
					>
						arrow_back
					</span>
					<div className="">
						{meal ? (
							<div>
								{meal &&
									meal.map((data: any) => (
										<div key={data._id}>
											<h1 className="text-3xl font-bold mb-5">{data.name}</h1>
											<p className="text-xl font-bold">
												Ingredients: <br />
											</p>
											{data.ingredients.join(", ")}
											<p className="text-xl mt-5 font-bold">Steps:</p>
											{data.steps.map((step: any) => (
												<li>{step}</li>
											))}
										</div>
									))}
							</div>
						) : (
							<p>Loading meal details...</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FavoriteDetails;
