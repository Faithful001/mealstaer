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
		_id: string,
		name: string,
		ingredients: string[],
		steps: string[],
		user_id: string
		// original_meal_id: string
	) {
		try {
			const id = await mealdb.meals.add({
				_id,
				name,
				ingredients,
				steps,
				user_id,
				// original_meal_id,
			});

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
		_id: string,
		name: string,
		ingredients: string[],
		steps: string[],
		user_id: string
		// original_meal_id: string
	) {
		try {
			const id = await personalizeddb.meals.add({
				_id,
				name,
				ingredients,
				steps,
				user_id,
				// original_meal_id,
			});

			console.log(id);
			return id;
		} catch (error: any) {
			console.log(error);
			throw new Error(error?.message);
		}
	}

	async getFromPersonalizedDB() {
		try {
			const fave = await personalizeddb.meals.toArray();
			const fieldValues = fave.map((item) => item);
			return fieldValues;
		} catch (error: any) {
			console.log(error);
			throw new Error(error?.message);
		}
	}
}

export const myDB = new IndexedDB();
