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
};

export const MealContext = createContext<Partial<ContextDataType>>({});

type MealContextProviderType = {
	children: ReactNode;
};

export type MealsType = {
	_id: any;
	name: string;
	image_url: string;
	ingredients: string[];
	steps: string[];
};

export const MealContextProvider = ({ children }: MealContextProviderType) => {
	const [value, setValue] = useState<MealsType[]>([]);
	const [notValue, setNotValue] = useState<any | undefined>("");
	const [searchValue, setSearchValue] = useState<MealsType[]>([]);
	const [notSearchValue, setNotSearchValue] = useState<any | undefined>("");
	console.log(value);

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
			}}
		>
			{children}
		</MealContext.Provider>
	);
};

export function useMeal() {
	return useContext(MealContext);
}
