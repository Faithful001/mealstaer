// import { meals } from "../data/mealAPI";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useMeal } from "../contexts/MealContext";

// type MealType = {
// 	id: number;
// 	name: string;
// 	image_url: string;
// 	ingredients: string[];
// 	steps: string[];
// };

const MealDetails = () => {
	const { value, notValue } = useMeal();
	console.log(value);
	console.log(notValue);
	// const [meal, setMeal] = useState<any>({});
	// console.log(typeof meal.ingredients);

	// const [fetchError, setFetchError] = useState<any>([]);
	let { id } = useParams();

	// value?.forEach((item: any) => {
	// 	if(item.id == id)
	// });

	// const { isLoading, error, data } = useQuery("meal", fetchData);
	// useEffect(() => {
	// 	if (data) {
	// 		setMeal(data);
	// 		setFetchError([]);
	// 	}
	// 	if (error) {
	// 		setFetchError(error);
	// 		setMeal([]);
	// 	}
	// }, []);

	// async function fetchData() {
	// 	try {
	// 		const response = await axios.get(`http://localhost:8080/api/data/${id}`);
	// 		return response.data;
	// 	} catch (error: any) {
	// 		throw error.message;
	// 	}
	// }

	return (
		<div className="meal-details p-5">
			<div className="section">
				<div>
					<p>{id}</p>
				</div>
			</div>
		</div>
	);
};

export default MealDetails;
