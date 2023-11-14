import Dexie, { Table } from "dexie";

export interface Meals {
	id?: number;
	_id: string;
	name: string;
	ingredients: string[];
	steps: string[];
	user_id: string;
	// original_meal_id: string;
}

export class MealClassedDexie extends Dexie {
	meals!: Table<Meals>;

	constructor() {
		super("mealsDatabase");
		this.version(1).stores({
			meals: "++id, _id, name, ingredients, steps, user_ids",
		});
	}
}
export class PersonalClassedDexie extends Dexie {
	meals!: Table<Meals>;

	constructor() {
		super("mealsDatabase");
		this.version(1).stores({
			meals: "++id, _id, name, ingredients, steps, user_ids",
		});
	}
}

export const mealdb = new MealClassedDexie();
export const personalizeddb = new PersonalClassedDexie();
