import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useMeal } from "../contexts/MealContext";
import { MealsType } from "../contexts/MealContext";

const RecommendedDetails = () => {
	const navigate = useNavigate();
	const [meal, setMeal] = useState<MealsType[]>([]);
	let { id } = useParams();
	console.log(meal);

	useEffect(() => {
		function getExactMeal() {
			const recommendedMeals =
				localStorage.getItem("recommended meals") || "[]";
			const parsedData = JSON.parse(recommendedMeals);
			const exactMeal = parsedData.find((meal: any) => meal._id == id);
			setMeal([exactMeal]);
		}
		getExactMeal();
	}, [id]);

	function handleBack(e: React.FormEvent<HTMLSpanElement>) {
		e.preventDefault();
		navigate("/");
	}

	return (
		<div className="recommended-details p-7">
			<div className="section">
				<div>
					<span
						className="material-symbols-outlined mb-5 p-2 cursor-pointer hover:cursor-pointer rounded-3xl hover:bg-[#e4e4e42c]"
						onClick={handleBack}
					>
						arrow_back
					</span>
					<div className="">
						{meal && Array.isArray(meal) && meal.length > 0 ? (
							<div>
								{meal.map((data: any) => (
									<div key={data._id}>
										<h1 className="text-3xl font-bold mb-5">{data.name}</h1>
										<p className="text-xl font-bold">
											Ingredients: <br />
										</p>
										{data.ingredients.join(", ")}
										<p className="text-xl mt-5 font-bold">Steps:</p>
										{data.steps.map((step: any) => (
											<li key={step}>{step}</li>
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

export default RecommendedDetails;
