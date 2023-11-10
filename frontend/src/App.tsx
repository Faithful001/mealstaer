import MealDetails from "./pages/MealDetails";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./pages/Body";
// import Saved from "./pages/Saved";
import Favorited from "./pages/Favorited";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FavoriteDetails from "./pages/FavoritedDetails";
import PersonalizedForm from "./pages/PersonalizedForm";

function App() {
	const queryClient = new QueryClient();
	return (
		<div className="pages">
			<Router>
				<QueryClientProvider client={queryClient}>
					<Routes>
						<Route path="/" element={<Body />} />
						<Route path="/user/meal/:id" element={<MealDetails />} />
						<Route path="/user/favorite" element={<Favorited />} />
						<Route path="/user/favorite/:id" element={<FavoriteDetails />} />
						{/* <Route path="/user/saved" element={<Saved />} /> */}
						{/* <Route path="/user/saved/:id" element={<Saved />} /> */}
						<Route path="/add-new-meal" element={<PersonalizedForm />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</QueryClientProvider>
			</Router>
		</div>
	);
}

export default App;
