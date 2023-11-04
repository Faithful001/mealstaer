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
	favorites: Array<MealsType>;
	setFavorites: Dispatch<SetStateAction<Array<MealsType>>> | undefined;
	saves: Array<MealsType>;
	setSaves: Dispatch<SetStateAction<Array<MealsType>>> | undefined;
}

export const FavoriteContext = createContext<Partial<FavoriteContextType>>({});

export const FavoriteContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [favorites, setFavorites] = useState<Array<MealsType>>([]);
	const [saves, setSaves] = useState<Array<MealsType>>([]);

	return (
		<FavoriteContext.Provider
			value={{ favorites, setFavorites, saves, setSaves }}
		>
			{children}
		</FavoriteContext.Provider>
	);
};

export const useFavorite = () => {
	return useContext(FavoriteContext);
};
