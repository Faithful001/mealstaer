import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { MealContextProvider } from "./contexts/MealContext.tsx";
import { FavoriteContextProvider } from "./contexts/FavoriteContext.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthContextProvider>
			<MealContextProvider>
				<FavoriteContextProvider>
					<QueryClientProvider client={queryClient}>
						<App />
					</QueryClientProvider>
				</FavoriteContextProvider>
			</MealContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);
