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
	notValue: object;
	setNotValue: Dispatch<SetStateAction<any>> | undefined;
};

export const MealContext = createContext<Partial<ContextDataType>>({});

type MealContextProviderType = {
	children: ReactNode;
};

export const MealContextProvider = ({ children }: MealContextProviderType) => {
	const [value, setValue] = useState<any>([]);
	const [notValue, setNotValue] = useState<any>("");
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
