import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, QueryClient } from "react-query";
import axios from "axios";
import { useMeal } from "../contexts/MealContext";
import wave from "../assets/wave1.png";
import { MealsType } from "../contexts/MealContext";
import favoritee from "../assets/favorite.svg";
import favorite_black from "../assets/favorite_black.svg";
// import turned_in from "../assets/turned_in.svg";
// import turned_in_black from "../assets/turned_in_black.svg";
// import { IndexedDB } from "../utils/methods/IndexedDB";
// import { useLiveQuery } from "dexie-react-hooks";
import { useFavorite } from "../contexts/FavoriteContext";
import { useToast } from "../contexts/ToastContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
	const navigate = useNavigate();
	const queryClient = new QueryClient();
	const [user_name, setUsername] = useState("");
	const [meals, setMeals] = useState<MealsType[]>([]);
	const [fetchError, setFetchError] = useState<any>(null);

	const {
		searchValue,
		setSearchValue = () => {},
		setValue = () => {},
	} = useMeal();

	const { favorites, setFavorites = () => {} } = useFavorite();
	const { toast: otherToast } = useToast();
	console.log(otherToast);

	// const [faveId, setFaveId] = useState<string>("");
	const [mealId, setMealId] = useState<string[]>([]);
	//forYou and byYou states
	const [forYou, setForYou] = useState<boolean>(true);
	const [byYou, setByYou] = useState<boolean>(false);
	//all states end

	//funtions & methods start

	useEffect(() => {
		toast(otherToast);
		setForYou(false);
		setByYou(true);
	}, [otherToast]);
	//onPageLoad data (render the meal data on page load)
	async function fetchData() {
		try {
			const response = await axios.get("http://localhost:4000/api/data", {
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			});
			console.log(response.data);
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
		}
	}, [data]);

	//check if search is an array of length > 0
	useEffect(() => {
		if (Array.isArray(searchValue) && searchValue.length > 0) {
			setMeals([]);
		}
	}, [searchValue]);

	//addToFavorites function
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

	// const {error: removeError, data: removeData} = useQuery("remove from favorite", removeFromFavorites, )

	//getting favorite meals from the database
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
			console.log(originalMealIds);
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

	//addToSaved function
	// async function addToSaved(meal: MealsType) {
	// 	try {
	// 		const body = {
	// 			name: meal.name,
	// 			ingredients: meal.ingredients,
	// 			steps: meal.steps,
	// 		};
	// 		const response = await axios.post(`http://localhost:4000/api/save`, body);
	// 		console.log(response);
	// 		console.log(meal._id);
	// 	} catch (error) {
	// 		console.log("Problem adding to fave");
	// 	}
	// }

	// removeFromSaved function
	// async function removeFromSaved(meal: MealsType) {
	// 	setSaved((prevSaved) => {
	// 		const newSet = new Set(prevSaved);
	// 		newSet.delete(meal);
	// 		return newSet;
	// 	});
	// }

	//getting the firstname of every user
	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			const userObject = JSON.parse(user);
			const user_name = userObject.user_name;
			const firstName = user_name.split(" ")[0];
			setUsername(firstName);
		}
	}, []);

	//switchToForYou fuunction
	function switchToForYou() {
		setForYou(true);
		setByYou(false);
	}
	//switchToByYou fuunction
	function switchToByYou() {
		setByYou(true);
		setForYou(false);
	}

	return (
		<div className="home">
			<div className="section p-5">
				<ToastContainer />
				<div className="mb-10">
					<div className="flex items-start">
						<h1 className="text-2xl font-semibold text-white mb-2 mr-2">
							Welcome, {user_name}
						</h1>
						<img src={wave} alt="" className="h-8" />
					</div>
					<span className="">What are we preparing today?</span>
				</div>
				<span
					className={`${
						forYou ? "bg-white text-black" : "border-white border-2 text-white"
					} rounded-3xl p-2 px-4 cursor-pointer text-sm`}
					onClick={switchToForYou}
				>
					For You
				</span>
				<span
					className={`${
						byYou ? "bg-white text-black" : "border-white border-2 text-white"
					} rounded-3xl p-2 px-4 cursor-pointer text-sm ml-3`}
					onClick={switchToByYou}
				>
					By You
				</span>

				{meals && forYou ? (
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
											src={favorite_black}
											alt=""
											className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
											onClick={() => removeFavoriteMutation.mutate(meal)}
										/>
									) : (
										<img
											src={favoritee}
											alt=""
											className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
											onClick={() => addFavoriteMutation.mutate(meal)}
										/>
									)}
									{/* {!saved ? (
										<img
											src={turned_in}
											alt=""
											className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
											onClick={() => addToSaved(meal)}
										/>
									) : (
										<img
											src={turned_in_black}
											alt=""
											className="text-white hover:cursor-pointer p-2 rounded-3xl hover:bg-[#e4e4e42c]"
											onClick={() => removeFromSaved(meal)}
										/>
									)} */}
								</div>
							</div>
						))}
					</div>
				) : error ? (
					<div className="text-red font-medium text-2xl">{fetchError}</div>
				) : (
					<div>loading...</div>
				)}
			</div>
		</div>
	);
};

export default Home;
