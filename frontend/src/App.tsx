import MealDetails from "./pages/MealDetails";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Body from "./pages/Body";
// import Saved from "./pages/Saved";
import Favorited from "./pages/Favorited";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FavoriteDetails from "./pages/FavoritedDetails";
import PersonalizedForm from "./pages/PersonalizedForm";
// import ForYou from "./pages/ForYou";
import PreContent from "./components/PreContent";
import PersonalizedDetails from "./pages/PersonalizedDetails";
import EditPersonalized from "./pages/EditPersonalized";
import Home from "./components/Home";
import RecommendedDetails from "./pages/RecommendedDetails";
// import ByYou from "./pages/ByYou";

function App() {
	const queryClient = new QueryClient();
	return (
		<div className="pages">
			<Router>
				<QueryClientProvider client={queryClient}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/user/meal/:id" element={<MealDetails />} />
						<Route
							path="/user/recommended/:id"
							element={<RecommendedDetails />}
						/>
						<Route
							path="/user/personalized/:id"
							element={<PersonalizedDetails />}
						/>
						<Route
							path="/user/personalized/edit/:id"
							element={<EditPersonalized />}
						/>
						<Route path="/user/favorite" element={<Favorited />} />
						<Route path="/user/favorite/:id" element={<FavoriteDetails />} />
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
