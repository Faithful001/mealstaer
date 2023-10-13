// import { meals } from "../data/mealAPI";

import { useParams } from "react-router-dom";
const MealDetails = () => {
	let { id } = useParams();

	return (
		<div className="meal-details p-5">
			<div className="section">
				<div>
					<p>{id}</p>
					{/* <h1 className="text-3xl">{name}</h1>
					<img src={image_url} alt="" />
					<p>{ingredients}</p>
					<li>{steps}</li> */}
				</div>
				{/* </div> */}
			</div>
		</div>
	);
};

export default MealDetails;
