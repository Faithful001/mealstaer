import {
	Dispatch,
	// ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

type ContextDataType = {
	forYou: any;
	setForYou: Dispatch<SetStateAction<any>>;
	byYou: any;
	setByYou: Dispatch<SetStateAction<any>>;
};

export const PageContext = createContext<Partial<ContextDataType>>({});

type PageContextProviderType = {
	children: React.ReactNode;
};

export const ToastContextProvider = ({ children }: PageContextProviderType) => {
	const [forYou, setForYou] = useState<any>("");
	const [byYou, setByYou] = useState<any>("");
	// console.log(toast);
	return (
		<PageContext.Provider value={{ forYou, setForYou, byYou, setByYou }}>
			{children}
		</PageContext.Provider>
	);
};

export function usePage() {
	return useContext(PageContext);
}
