// import { ObjectId } from "mongodb";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

type ContextDataType = {
	value: MealsType[] | undefined;
	setValue: Dispatch<SetStateAction<MealsType[]>> | undefined;
	notValue: ReactNode;
	setNotValue: Dispatch<SetStateAction<MealsType[]>> | undefined;
	searchValue: MealsType[] | undefined;
	setSearchValue: Dispatch<SetStateAction<MealsType[]>> | undefined;
	notSearchValue: ReactNode;
	setNotSearchValue: Dispatch<SetStateAction<MealsType[]>> | undefined;
	search: string;
	setSearch: Dispatch<SetStateAction<string>>;
};

export const MealContext = createContext<Partial<ContextDataType>>({});

type MealContextProviderType = {
	children: ReactNode;
};

export type MealsType = {
	_id: any;
	name: string;
	ingredients: string[];
	steps: string[];
	user_id: string;
};

export const MealContextProvider = ({ children }: MealContextProviderType) => {
	const [value, setValue] = useState<MealsType[]>([]); //meal data gotten from the server
	const [notValue, setNotValue] = useState<any | undefined>("");
	const [searchValue, setSearchValue] = useState<MealsType[]>([]); //returned meal data after filtered search
	const [notSearchValue, setNotSearchValue] = useState<any | undefined>("");
	const [search, setSearch] = useState<string>(""); //character written in the input
	console.log(searchValue);

	return (
		<MealContext.Provider
			value={{
				value,
				setValue,
				notValue,
				setNotValue,
				searchValue,
				setSearchValue,
				notSearchValue,
				setNotSearchValue,
				search,
				setSearch,
			}}
		>
			{children}
		</MealContext.Provider>
	);
};

export function useMeal() {
	return useContext(MealContext);
}
