import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, QueryClient } from "react-query";
import axios from "axios";
import { useMeal } from "../contexts/MealContext";
import { MealsType } from "../contexts/MealContext";
import favorite from "../assets/favorite2.svg";
import favorite_white from "../assets/favorite2_white.svg";
import { useToast } from "../contexts/ToastContext";
import { useLiveQuery } from "dexie-react-hooks";
import { myDB } from "../utils/methods/IndexedDB";
import { useFavorite } from "../contexts/FavoriteContext";
// import { usePage } from "../contexts/PageContext";
import { URL } from "../utils/methods/url/URL";
import localStorageUtil from "../utils/localStorage.util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/NavBar";
import Recommended from "../components/Recommended";
import PreContent from "../components/PreContent";

const ForYou = () => {
	const [user_name, setUsername] = useState("");
	const { toast: otherToast } = useToast();
	// const navigate = useNavigate();

	useEffect(() => {
		!localStorageUtil.getFromStorage("user") && navigate("/login");
	}, []);

	useEffect(() => {
		if (otherToast !== "") {
			toast(otherToast);
		}
	}, [otherToast]);

	useEffect(() => {
		const user = localStorageUtil.getFromStorage("user");
		if (user) {
			const user_name = user && user?.user_name;
			const firstName = user_name.split(" ")[0];
			setUsername(firstName);
		}
	}, []);
	const abortCont = new AbortController();

	const prodURL = URL.prodURL;
	const navigate = useNavigate();
	const queryClient = new QueryClient();
	const { setToast = () => {} } = useToast();

	// const { byYou, setByYou } = usePage();

	//all states start
	const [meals, setMeals] = useState<MealsType[]>([]);
	const [mealsError, setMealsError] = useState<boolean>(false);
	const [fetchError, setFetchError] = useState<any>(null);
	console.log(meals);

	const {
		search,
		searchValue,
		setSearchValue = () => {},
		setValue = () => {},
	} = useMeal();

	const { favorites, setFavorites = () => {} } = useFavorite();

	const [mealId, setMealId] = useState<string[]>([]);

	//forYou and byYou states
	// const [forYou, setForYou] = useState<boolean>(true);
	// const [byYou, setByYou] = useState<boolean>(false);
	//all states end

	//funtions & methods start
	//onPageLoad data (render the meal data on page load)
	async function fetchData() {
		meals.length = 0;
		const token = localStorageUtil.getFromStorage("token");

		try {
			const response = await axios.get(`${prodURL}/api/data`, {
				signal: abortCont.signal,
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
					Authorization: `Bearer ${token}`,
				},
			});
			// console.log(response.data);
			localStorageUtil.addToStorage("By-You", response.data);
			abortCont.abort();
			// return localStorageUtil.getFromStorage("By-You");
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

	//add meals to indexed db
	async function addMealToMealDB() {
		try {
			await myDB.addToMealDB(data);
		} catch (error: any) {
			console.error(error?.message);
		}
	}

	useEffect(() => {
		addMealToMealDB();
	}, []);

	const mealsFromIndexedDB = useLiveQuery(() => {
		myDB
			.getFromMealDB()
			.then((res) => {
				// console.log(res);
				return res;
			})
			.catch((error: any) => {
				console.error(error?.message);
				throw error?.message;
			});
	});

	console.log(mealsFromIndexedDB);

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
	}, [meals, data, search, setValue, setSearchValue]);

	//check if search is an array of length > 0
	// useEffect(() => {
	// 	if (search && Array.isArray(searchValue) && searchValue.length > 0) {
	// 		setMeals(searchValue);
	// 		setMealsError(false);
	// 	} else {
	// 		// setMeals([]);
	// 		setMealsError(true);
	// 	}
	// }, [searchValue]);

	//addToFavorites function
	async function addToFavorites(meal: MealsType) {
		localStorageUtil.addToStorage("meal_id", meal._id);
		const token = localStorageUtil.getFromStorage("token");
		try {
			const body = {
				name: meal.name,
				ingredients: meal.ingredients,
				steps: meal.steps,
				original_meal_id: meal._id,
			};
			const response = await axios.post(`${prodURL}/api/fave/`, body, {
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
					Authorization: `Bearer ${token}`,
				},
			});
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
		onError: (context: any) => {
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

	const meal_id = localStorageUtil.getFromStorage("meal_id");

	// removeFromFavorite function
	async function removeFromFavorites(meal: MealsType) {
		localStorage.removeItem("meal_id");
		const token = localStorageUtil.getFromStorage("token");
		try {
			const getReqRes = await axios.get(`${prodURL}/api/fave`, {
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
					Authorization: `Bearer ${token}`,
				},
			});
			// const meal = getReqRes.data.map((item: any)=> item._id)
			const faveMealId = getReqRes.data.find(
				(item: any) => item.original_meal_id == meal._id
			);
			const response = await axios.delete(
				`${prodURL}/api/fave/${faveMealId._id}`,
				{
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
						Authorization: `Bearer ${token}`,
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
		onError: (context: any) => {
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
		const token = localStorageUtil.getFromStorage("token");
		try {
			const response = await axios.get(`${prodURL}/api/fave/`, {
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
					Authorization: `Bearer ${token}`,
				},
			});
			const originalMealIds = response.data.map(
				(item: any) => item.original_meal_id
			);
			return originalMealIds;
		} catch (error: any) {
			if (error.response.status == 401) {
				navigate("/login");
			} else {
				console.log(error);
			}
		}
	}
	const { data: queryData } = useQuery("fave", getFavoritesFromDB, {
		enabled: Boolean(favorites),
	});

	useEffect(() => {
		if (queryData) {
			setMealId(queryData);
		}
	}, [queryData]);

	//find the original_meal_id from the mealId state array
	function compareId(meal_id: any) {
		return mealId.find((id: any) => id == meal_id);
	}

	// function queryParam() {
	// 	return new URLSearchParams(useLocation().search);
	// }
	// const query = queryParam().get("tab");
	// setByYou?.(query);

	function navigateToForYou() {
		navigate("/");
		meals.length = 0;
	}
	function navigateToByYou() {
		navigate("/by-you");
		meals.length = 0;
	}

	return (
		<div className="for-you flex flex-col">
			<NavBar />
			<ToastContainer />
			<PreContent user_name={user_name} />
			<Recommended />
			<div className="section pt-2 px-5">
				<div className="flex gap-4">
					<button
						className="bg-white rounded-3xl text-black text-sm p-2 px-4 border"
						onClick={navigateToForYou}
					>
						For You
					</button>
					<button
						className=" border-white border-2 rounded-3xl text-sm p-2 px-4"
						onClick={navigateToByYou}
					>
						By You
					</button>
				</div>
				{meals && meals.length > 0 ? (
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white mt-8">
						{meals.map((meal: MealsType) => (
							<div key={meal._id} className="bg-[#424242] rounded-lg p-5">
								<Link to={`/user/meal/${meal._id}`}>
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
				) : error ? (
					<div className="text-red font-medium text-xxl">{fetchError}</div>
				) : meals && meals.length < 1 ? (
					<div className="text-xl mt-5">Fetching meals...</div>
				) : (
					""
				)}
				{mealsError && (
					<div className="text-red font-medium text-xl">Meal not found</div>
				)}
			</div>
		</div>
	);
};

export default ForYou;
