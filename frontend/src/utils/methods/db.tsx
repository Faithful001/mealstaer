import Dexie, { Table } from "dexie";

export interface FavoriteMeals {
	id?: number;
	_id: string;
	name: string;
	ingredients: string[];
	steps: string[];
	user_id: string;
	original_meal_id: string;
}

export class MySubClassedDexie extends Dexie {
	favorites!: Table<FavoriteMeals>;

	constructor() {
		super("myDatabase");
		this.version(1).stores({
			favorites:
				"++id, _id, name, ingredients, steps, user_id, original_meal_id",
		});
	}
}

export const db = new MySubClassedDexie();
