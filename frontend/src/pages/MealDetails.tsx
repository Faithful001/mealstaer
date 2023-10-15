import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MealDetails = () => {
	const navigate = useNavigate();
	const [meal, setMeal] = useState<any>(null);
	console.log(meal);
	// const [fetchError, setFetchError] = useState<any>(null);
	let { id } = useParams();

	useEffect(() => {
		const mealData = localStorage.getItem("meals");

		if (mealData) {
			const parsedData = JSON.parse(mealData);
			const matchingMeals = parsedData.filter(
				(item: any) => item.id.toString() === id
			);
			console.log(matchingMeals);
			setMeal(matchingMeals);
		}
	}, [id]);

	function handleBack(e: React.FormEvent<HTMLSpanElement>) {
		e.preventDefault();
		navigate(-1);
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
								{meal.map((data: any) => (
									<div key={data.id}>
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

export default MealDetails;
