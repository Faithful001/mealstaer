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
		user_id: string
	) {
		try {
			// Add the new friend!
			const id = await db.favorites.add({
				_id,
				name,
				ingredients,
				steps,
				user_id,
			});

			console.log(id);
			return id;
		} catch (error) {
			console.log(error);
			return error;
		}
	}
}

// const DB = new IndexedDB.addToDB
