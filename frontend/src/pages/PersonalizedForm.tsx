import axios from "axios";
import { useState } from "react";

const PersonalizedForm = () => {
	const [name, setName] = useState<string>("");
	const [ingredients, setIngredients] = useState<string>("");
	const [steps, setSteps] = useState<string>("");
	async function handleSubmit() {
		// const response = await axios.get()
	}
	return (
		<div className="personalized-form">
			<div className="section">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="name"
						placeholder="Meal name"
						onChange={(e) => setName(e.target.value)}
					/>
					<textarea
						name="ingredients"
						placeholder="Ingredients"
						onChange={(e) => setIngredients(e.target.value)}
					></textarea>
					<textarea
						name="steps"
						placeholder="Steps"
						onChange={(e) => setSteps(e.target.value)}
					></textarea>
				</form>
			</div>
		</div>
	);
};

export default PersonalizedForm;
