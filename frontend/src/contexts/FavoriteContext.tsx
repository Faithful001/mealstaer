import { MealsType } from "./MealContext";
import {
	ReactNode,
	Dispatch,
	SetStateAction,
	createContext,
	useState,
	useContext,
} from "react";

export interface FavoriteContextType {
	favorited: Set<MealsType>;
	setFavorited: Dispatch<SetStateAction<Set<MealsType>>>;
	saved: Set<MealsType>;
	setSaved: Dispatch<SetStateAction<Set<MealsType>>>;
}

export const FavoriteContext = createContext<Partial<FavoriteContextType>>({});

export const FavoriteContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [favorited, setFavorited] = useState<Set<MealsType>>(new Set());
	const [saved, setSaved] = useState<Set<MealsType>>(new Set());

	return (
		<FavoriteContext.Provider
			value={{ favorited, setFavorited, saved, setSaved }}
		>
			{children}
		</FavoriteContext.Provider>
	);
};

export const useFavorite = () => {
	return useContext(FavoriteContext);
};
