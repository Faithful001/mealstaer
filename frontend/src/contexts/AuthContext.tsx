import {
	ReactNode,
	createContext,
	useReducer,
	useEffect,
	useContext,
} from "react";

interface ContextType {
	state: object;
	dispatch: any;
}

export const AuthContext = createContext<Partial<ContextType>>({});

const INITIALSTATE = {
	user: null,
};

// interface UserType {
// 	user_name: string;
// 	email: string;
// 	password: string;
// 	favoritedList: object[];
// 	savedList: object[];
// }

export const authReducer = (state: any, action: any) => {
	switch (action.type) {
		case "LOGIN":
			return {
				user: action.payload,
			};
		case "LOGOUT":
			return {
				user: null,
			};
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, INITIALSTATE);
	useEffect(() => {
		const userString = localStorage.getItem("user");
		if (userString) {
			const user = JSON.parse(userString);
			dispatch({ type: "LOGIN", payload: user });
		}
	}, []);

	console.log("AuthContext state:", state);
	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
