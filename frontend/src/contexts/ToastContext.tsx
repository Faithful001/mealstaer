import {
	Dispatch,
	// ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

type ContextDataType = {
	toast: string | undefined;
	setToast: Dispatch<SetStateAction<string>>;
};

export const ToastContext = createContext<Partial<ContextDataType>>({});

type ToastContextProviderType = {
	children: React.ReactNode;
};

export const ToastContextProvider = ({
	children,
}: ToastContextProviderType) => {
	const [toast, setToast] = useState<string>("");
	console.log(toast);
	return (
		<ToastContext.Provider value={{ toast, setToast }}>
			{children}
		</ToastContext.Provider>
	);
};

export function useToast() {
	return useContext(ToastContext);
}
