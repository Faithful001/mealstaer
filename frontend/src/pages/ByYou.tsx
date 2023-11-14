import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MealsType } from "../contexts/MealContext";
import { useQuery, useMutation, QueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMeal } from "../contexts/MealContext";
import { useFavorite } from "../contexts/FavoriteContext";
import favorite from "../assets/favorite2.svg";
import favorite_white from "../assets/favorite2_white.svg";
import { useToast } from "../contexts/ToastContext";
// import NavBar from "../components/NavBar";
// import PreContent from "../components/PreContent";
// import { usePage } from "../contexts/PageContext";

interface PropsType {
	name: string | null;
}
const ByYou: React.FC<PropsType> = ({ name }) => {
	const navigate = useNavigate();
	const queryClient = new QueryClient();
	const [meals, setMeals] = useState<MealsType[]>([]);
	const [mealsError, setMealsError] = useState<boolean>(false);
	const [fetchError, setFetchError] = useState<any>(null);
	const { favorites, setFavorites = () => {} } = useFavorite();
	const [mealId, setMealId] = useState<string[]>([]);
	const { setToast = () => {} } = useToast();
	// const { byYou, setByYou } = usePage();

	const {
		search,
		searchValue,
		setSearchValue = () => {},
		setValue = () => {},
	} = useMeal();

	//onPageLoad data (render the meal data on page load)
	async function fetchData() {
		try {
			const response = await axios.get(
				"http://localhost:4000/api/personalized",
				{
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
			// console.log(response.data);
			return response.data;
		} catch (error: any) {
			if (error.response.status == 401) {
				navigate("/login");
			} else {
				setFetchError(`Something went wrong, ${error.message}`);
				console.log(`Something went wrong, ${error.message}`);
			}
		}
	}

	const { isLoading, error, data } = useQuery("meals", fetchData, {
		enabled: Boolean(meals),
	});
	console.log(isLoading);
	useEffect(() => {
		if (data) {
			setMeals(data);
			setFetchError(null);
			setValue(data);
			setSearchValue([]);
			setMealsError(false);
		}
		if (!search) {
			setMeals(data);
			setFetchError(null);
			setValue(data);
			setSearchValue([]);
			setMealsError(false);
		} else if (search && Array.isArray(searchValue) && searchValue.length > 0) {
			setMeals(searchValue);
			setMealsError(false);
		} else if (searchValue && searchValue.length < 1) {
			setMealsError(true);
			setMeals([]);
		}
	}, [data, search, setValue, setSearchValue]);

	async function addToFavorites(meal: MealsType) {
		localStorage.setItem("meal_id", meal._id);
		try {
			const body = {
				name: meal.name,
				ingredients: meal.ingredients,
				steps: meal.steps,
				original_meal_id: meal._id,
			};
			const response = await axios.post(
				"http://localhost:4000/api/fave/",
				body,
				{
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
			setToast(`${meal.name} added to favorites`);
			setFavorites(response.data);
			console.log(meal._id);
		} catch (error: any) {
			if (error.response.status == 401) {
				navigate("/login");
			} else {
				console.log("Problem adding to fave");
			}
		}
	}
	// addToFavorite function with the useMutation hook
	const addFavoriteMutation = useMutation(addToFavorites, {
		onMutate: async (meal) => {
			// Store the previous data in a variable
			const prevData = queryClient.getQueryData("fave");

			// Optimistically update the cache to reflect addition
			queryClient.setQueryData("fave", (prevData: any) => {
				if (prevData) {
					return [...prevData, meal]; // Assuming 'meal' is the new favorite item
				}
				return prevData;
			});

			// Return the previous data for potential rollback
			return { prevData };
		},
		onError: (error, variables, context: any) => {
			// Rollback the cache to its previous state if the mutation fails
			if (context.prevData) {
				queryClient.setQueryData("fave", context.prevData);
			}
		},
		onSettled: () => {
			// Refetch the favorites data after the mutation is complete
			queryClient.invalidateQueries("fave");
		},
	});

	const meal_id = localStorage.getItem("meal_id");

	// removeFromFavorite function
	async function removeFromFavorites(meal: MealsType) {
		localStorage.removeItem("meal_id");
		try {
			const getReqRes = await axios.get("http://localhost:4000/api/fave", {
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			});
			// const meal = getReqRes.data.map((item: any)=> item._id)
			const faveMealId = getReqRes.data.find(
				(item: any) => item.original_meal_id == meal._id
			);
			const response = await axios.delete(
				`http://localhost:4000/api/fave/${faveMealId._id}`,
				{
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
			setToast(`${meal.name} removed from favorites`);
			console.log(response.data);
		} catch (error: any) {
			if (error.response.status == 401) {
				navigate("/login");
			} else {
				console.log(error);
			}
		}
	}
	//removeFromFavorite function with useMutation
	const removeFavoriteMutation = useMutation(removeFromFavorites, {
		onMutate: async (meal) => {
			// Store the previous data in a variable
			const prevData = queryClient.getQueryData("fave");

			// Optimistically update the cache to reflect removal
			queryClient.setQueryData("fave", (prevData: any) => {
				if (prevData) {
					return prevData.filter(
						(item: any) => item.original_meal_id !== meal._id
					);
				}
				return prevData;
			});

			// Return the previous data for potential rollback
			return { prevData };
		},
		onError: (error, variables, context: any) => {
			// Rollback the cache to its previous state if the mutation fails
			if (context.prevData) {
				queryClient.setQueryData("fave", context.prevData);
			}
		},
		onSettled: () => {
			// Refetch the favorites data after the mutation is complete
			queryClient.invalidateQueries("fave");
		},
	});

	//getting favorite meals from the database and mapping through their original_meal_ids
	async function getFavoritesFromDB() {
		try {
			const response = await axios.get("http://localhost:4000/api/fave/", {
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			});
			const originalMealIds = response.data.map(
				(item: any) => item.original_meal_id
			);
			// console.log(originalMealIds);
			return originalMealIds;
		} catch (error: any) {
			if (error.response.status == 401) {
				navigate("/login");
			} else {
				console.log(error);
			}
		}
	}
	const { error: queryError, data: queryData } = useQuery(
		"fave",
		getFavoritesFromDB,
		{
			enabled: Boolean(favorites),
		}
	);

	useEffect(() => {
		if (queryData) {
			setMealId(queryData);
		}
	}, [queryData]);

	//find the original_meal_id from the mealId state array
	function compareId(meal_id: any) {
		return mealId.find((id: any) => id == meal_id);
	}

	return (
		<div className="by-you px-5 ">
			<div className="section">
				{meals && meals.length > 0 && name == "by-you" ? (
					<div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-white mt-8">
						{meals.map((meal: MealsType) => (
							<div key={meal._id} className="bg-[#424242] rounded-lg p-5">
								<Link to={`/user/personalized/${meal._id}`}>
									<div className="">
										<h2 className="text-xl mb-3">{meal.name}</h2>
									</div>
								</Link>
								<div className="-mb-2 flex">
									{/* Check if meal is favorited and render the appropriate button */}
									{compareId(meal._id) == meal._id || meal_id == meal._id ? (
										<img
											src={favorite_white}
											alt=""
											className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
											onClick={() => removeFavoriteMutation.mutate(meal)}
										/>
									) : (
										<img
											src={favorite}
											alt=""
											className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
											onClick={() => addFavoriteMutation.mutate(meal)}
										/>
									)}
								</div>
							</div>
						))}
					</div>
				) : error && error ? (
					<div className="text-red font-medium text-2xl">{fetchError}</div>
				) : (
					<div className="text-xl mt-5">No meal available</div>
				)}
				{mealsError && (
					<div className="text-red font-medium text-xl">Meal not found</div>
				)}
			</div>
		</div>
	);
};

export default ByYou;
