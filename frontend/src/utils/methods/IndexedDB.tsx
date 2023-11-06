import { db } from "./db";
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

	async addToDB(
		_id: string,
		name: string,
		ingredients: string[],
		steps: string[],
		user_id: string,
		original_meal_id: string
	) {
		try {
			const id = await db.favorites.add({
				_id,
				name,
				ingredients,
				steps,
				user_id,
				original_meal_id,
			});

			console.log(id);
			return id;
		} catch (error: any) {
			console.log(error);
			throw new Error(error?.message);
		}
	}

	async getFromDB() {
		try {
			const fave = await db.favorites.toArray();
			const fieldValues = fave.map((item) => item.original_meal_id);
			return fieldValues;
		} catch (error: any) {
			console.log(error);
			throw new Error(error?.message);
		}
	}
}
