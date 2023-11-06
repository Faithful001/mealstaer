// import { MealsType } from "./MealContext";
import {
	ReactNode,
	Dispatch,
	SetStateAction,
	createContext,
	useState,
	useContext,
} from "react";

export interface FavoriteContextType {
	favorites: any;
	setFavorites: Dispatch<SetStateAction<any>> | undefined;
	saves: any;
	setSaves: Dispatch<SetStateAction<any>> | undefined;
}

export const FavoriteContext = createContext<Partial<FavoriteContextType>>({});

export const FavoriteContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [favorites, setFavorites] = useState<any>([]);
	const [saves, setSaves] = useState<any>([]);

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
