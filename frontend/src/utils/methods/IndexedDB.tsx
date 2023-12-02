import { mealdb } from "./db";
import { personalizeddb } from "./db";
// import { FavoriteMeals } from "./db";

export class IndexedDB {
	// constructor(
	// 	_id: string,
	// 	name: string,
	// 	ingredients: string[],
	// 	steps: string[],
	// 	user_id: string
	// ) {
	// 	_id = _id;
	// 	name = name;
	// 	ingredients = ingredients;
	// 	steps = steps;
	// 	user_id = user_id;
	// }

	async addToMealDB(
		meals: any[]
		// original_meal_id: string
	) {
		try {
			// if (!meals) {
			// 	console.error("Meals array is undefined or null");
			// 	return [];
			// }
			const id = meals?.map(
				async (meal) =>
					await mealdb?.meals.add({
						_id: meal._id,
						name: meal.name,
						ingredients: meal.ingredients,
						steps: meal.steps,
						user_id: meal.user_id,
						// original_meal_id,
					})
			);

			console.log(id);
			return id;
		} catch (error: any) {
			console.log(error);
			throw new Error(error?.message);
		}
	}

	async getFromMealDB() {
		try {
			const fave = await mealdb.meals.toArray();
			const fieldValues = fave.map((item) => item);
			return fieldValues;
		} catch (error: any) {
			console.log(error);
			throw new Error(error?.message);
		}
	}

	//personlized
	async addToPersonalizedDB(
		personalized: any[]
		// original_meal_id: string
	) {
		try {
			// if (!personalized) {
			// 	console.error("Meals array is undefined or null");
			// 	return [];
			// }
			const id = personalized.map((meal) =>
				personalizeddb.personalized.add({
					_id: meal._id,
					name: meal.name,
					ingredients: meal.ingredients,
					steps: meal.steps,
					user_id: meal.user_id,
					// original_meal_id,
				})
			);

			console.log(id);
			return id;
		} catch (error: any) {
			console.log(error);
			throw new Error(error?.message);
		}
	}

	async getFromPersonalizedDB() {
		try {
			const fave = await personalizeddb.personalized.toArray();
			const fieldValues = fave.map((item) => item);
			return fieldValues;
		} catch (error: any) {
			console.log(error);
			throw new Error(error?.message);
		}
	}
}

export const myDB = new IndexedDB();
