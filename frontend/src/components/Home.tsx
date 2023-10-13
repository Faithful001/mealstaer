// import { useState, useEffect } from "react";
// import { fetchId } from "../methods/apiId";
import { meals } from "../data/mealAPI.ts";
import { Link } from "react-router-dom";

type mealType = {
	id: number;
	name: string;
	image_url: string;
	ingredients: string[];
	steps: string[];
};

const Home = () => {
	return (
		<div className="home">
			<div className="section m-5">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
					{meals.meals.map((meal: mealType) => (
						<Link to={`/meal/${meal.id}`}>
							<div key={meal.id} className="">
								<div className="rounded-lg bg-[#424242] p-5">
									<h2 className="text-2xl">{meal.name}</h2>
									<img src={meal.image_url} alt={meal.name} />
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
