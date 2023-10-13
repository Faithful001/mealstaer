import MealDetails from "./pages/MealDetails";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./pages/Body";

function App() {
	const queryClient = new QueryClient();
	return (
		<>
			<Router>
				<QueryClientProvider client={queryClient}>
					<Routes>
						<Route path="/" element={<Body />} />
						<Route path="/meal/:id" element={<MealDetails />} />
					</Routes>
				</QueryClientProvider>
			</Router>
		</>
	);
}

export default App;
