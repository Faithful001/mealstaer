"use client";
import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
// import { useMeal } from "../contexts/MealContext";
import { MealsType } from "../contexts/MealContext";
import axios from "axios";
import { useQuery } from "react-query";
import { useToast } from "../contexts/ToastContext";
import { URL } from "../utils/methods/url/URL";

const PersonalizedDetails = () => {
	const prodURL = URL.prodURL;
	const navigate = useNavigate();
	const [meal, setMeal] = useState<MealsType[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState(false);
	// const [favoriteMealId, setFavoriteMealId] = useState<string>("");
	// console.log(favoriteMealId);
	const { setToast = () => {} } = useToast();
	// console.log(meal);
	// const [fetchError, setFetchError] = useState<any>(null);
	let { id } = useParams();

	async function fetchData() {
		try {
			const response = await axios.get(`${prodURL}/api/personalized/${id}`, {
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			});
			// console.log(response.data);
			return [response.data];
		} catch (error: any) {
			if (error.response.status == 401) {
				navigate("/login");
			} else {
				console.log(`Something went wrong, ${error.message}`);
			}
		}
	}

	const { isLoading, error, data } = useQuery("meals", fetchData, {
		enabled: Boolean(meal),
	});
	// console.log(isLoading);

	useEffect(() => {
		if (data) {
			setMeal(data);
		}
	}, [data]);

	// useEffect(() => {
	// 	// const mealData = localStorage.getItem("meals");

	// 	if (value) {
	// 		const matchingMeals = value.find(
	// 			(item: any) => item._id?.toString() === id
	// 		);
	// 		console.log(matchingMeals);
	// 		setMeal(matchingMeals);
	// 	}
	// }, [id]);

	function handleBack(e: React.FormEvent<HTMLSpanElement>) {
		e.preventDefault();
		navigate("/?tab=by-you");
	}
	function openMenu() {
		setIsOpen(!isOpen);
	}

	function handleEdit(id: any) {
		navigate(`/user/personalized/edit/${id}`);
	}

	async function deleteFromFavorite(id: any) {
		try {
			const response = await axios.get(`${prodURL}/api/fave`, {
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			});
			const meal = response.data.find(
				(meal: any) => meal.original_meal_id == id
			);
			console.log(meal._id);
			//   setFavoriteMealId(meal._id);

			const deleteResponse = await axios.delete(
				`${prodURL}/api/fave/${meal._id}`,
				{
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
			console.log(deleteResponse.data);

			return response.data;
		} catch (error: any) {
			console.log(error);
		}
	}

	async function handleDelete(id: any, name: string) {
		deleteFromFavorite(id);

		try {
			const response = await axios.delete(`${prodURL}/api/personalized/${id}`, {
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			});
			console.log(response);
			setToast(`${name} deleted successfully`);
			navigate("/?tab=by-you");
		} catch (error: any) {
			if (error.response.status == 401) {
				navigate("/login");
			} else {
				console.log(`Something went wrong, ${error.message}`);
			}
		}
	}

	return (
		<div className="meal-details p-7">
			<div className="section">
				<div>
					<span
						className="material-symbols-outlined mb-5 p-2 cursor-pointer hover:cursor-pointer rounded-3xl hover:bg-[#e4e4e42c]"
						onClick={handleBack}
					>
						arrow_back
					</span>
					<div className="">
						{meal ? (
							<div>
								{meal &&
									meal.map((data: any) => (
										<div key={data._id}>
											<div className="flex gap-5 items-center">
												<h1 className="text-3xl font-bold mb-5">{data.name}</h1>
												<span
													className="material-symbols-outlined mb-3 cursor-pointer hover:bg-[#e4e4e42c] p-2 rounded-3xl"
													onClick={openMenu}
												>
													more_horiz
												</span>
											</div>
											{isOpen && (
												<div
													className="bg-white rounded-md p-5 flex flex-col
					 absolute left-[100px] top-[130px] z-10 gap-3"
												>
													<div
														className="flex gap-2 cursor-pointer hover:bg-[#3d3d3d2c] p-2 px-6 rounded-3xl"
														onClick={() => handleEdit(data._id)}
													>
														<span className="material-symbols-outlined text-black">
															edit_note
														</span>
														<p className="text-black">Edit</p>
													</div>
													<div
														className="flex gap-2 cursor-pointer hover:bg-[#3d3d3d2c] p-2 px-6 rounded-3xl"
														onClick={() => setOpenModal(true)}
													>
														<span className="material-symbols-outlined text-black ">
															delete
														</span>
														<p className="text-black">Delete</p>
													</div>

													<Modal
														show={openModal}
														size="md"
														onClose={() => setOpenModal(false)}
														popup
														className="md:p-0 pt-[10rem] px-5"
													>
														<Modal.Header />
														<Modal.Body>
															<div className="text-center">
																<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
																<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
																	Are you sure you want to delete this meal?
																</h3>
																<div className="flex justify-center gap-4">
																	<Button
																		color="failure"
																		onClick={() =>
																			handleDelete(data._id, data.name)
																		}
																	>
																		Yes, I'm sure
																	</Button>
																	<Button
																		color="gray"
																		onClick={() => setOpenModal(false)}
																	>
																		No, cancel
																	</Button>
																</div>
															</div>
														</Modal.Body>
													</Modal>
												</div>
											)}
											<p className="text-xl font-bold">
												Ingredients: <br />
											</p>
											{data.ingredients.join(", ")}
											<p className="text-xl mt-5 font-bold">Steps:</p>
											{data.steps.map((step: any) => (
												<li>{step}</li>
											))}
										</div>
									))}
							</div>
						) : (
							<p>Loading meal details...</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PersonalizedDetails;
