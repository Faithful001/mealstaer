import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

type ContextDataType = {
	value: object;
	setValue: Dispatch<SetStateAction<any>> | undefined;
	notValue: ReactNode;
	setNotValue: Dispatch<SetStateAction<any>> | undefined;
};

export const MealContext = createContext<Partial<ContextDataType>>({});

type MealContextProviderType = {
	children: ReactNode;
};

type MealsType = {
	id: number;
	name: string;
	image_url: string;
	ingredients: string[];
	steps: string[];
};

export const MealContextProvider = ({ children }: MealContextProviderType) => {
	const [value, setValue] = useState<MealsType[]>([]);
	const [notValue, setNotValue] = useState<any | undefined>("");
	console.log(value);

	return (
		<MealContext.Provider value={{ value, setValue, notValue, setNotValue }}>
			{children}
		</MealContext.Provider>
	);
};

export function useMeal() {
	return useContext(MealContext);
}
