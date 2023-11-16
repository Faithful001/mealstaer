"use client";
import { Label } from "flowbite-react";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../contexts/ToastContext";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { URL } from "../utils/methods/url/URL";

const EditPersonalized = () => {
	const prodURL = URL.prodURL;
	const navigate = useNavigate();
	const [name, setName] = useState<string>("");
	const [ingredients, setIngredients] = useState<string>("");
	const [ingredientsMessage, setIngredientsMessage] = useState<boolean>(true);
	const [steps, setSteps] = useState<string>("");
	const [stepsMessage, setStepsMessage] = useState<boolean>(true);
	const [error, setError] = useState<any>("");
	const { setToast = () => {} } = useToast();

	let { id } = useParams();

	async function getMealsData() {
		try {
			const response = await axios.get(`${prodURL}/api/personalized/${id}`, {
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			});

			// console.log(response.data);
			return response.data;
		} catch (error: any) {
			if (error?.response?.status === 401) {
				navigate("/login");
			} else {
				console.error("Error fetching meal", error?.response?.data?.error);
				throw error?.response?.data?.error;
			}
		}
	}

	const {
		isLoading,
		error: queryError,
		data,
	} = useQuery(["meals", id], getMealsData);

	const ingredient = data?.ingredients.join(", ");
	const step = data?.steps.join("\n");

	useEffect(() => {
		if (data) {
			setName(data?.name.toString());
			setIngredients(ingredient);
			setSteps(step);
		}
		if (queryError) {
			setError(queryError);
		}
	}, [data, queryError]);

	function formatSteps(steps: string) {
		const split = steps.split("\n");
		const formattedSteps = split.map((step) => step.trim());
		return formattedSteps;
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const isCommaSeparated = /^(?:\s*\w+\s*(?:,\s*\w+\s*)*)?$/.test(
			ingredients
		);
		const isStepsValid = /^(?![0-9]+\.\s).*(?:\r?\n(?!([0-9]+\.\s)).*)*$/.test(
			steps
		);

		if (!isCommaSeparated) {
			setIngredientsMessage(false);
			return;
		}

		if (!isStepsValid) {
			setStepsMessage(false);
			return;
		}

		const formattedSteps = formatSteps(steps);

		const personalizedMealData = {
			name,
			ingredients,
			steps: formattedSteps,
		};

		try {
			const response = await axios.patch(
				`${prodURL}/api/personalized/${id}`,
				personalizedMealData,
				{
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				}
			);

			console.log("Meal edited successfully", response.data);
			setToast(`${name} edited successfully`);
			navigate("/?tab=by-you");
			return response.data;
		} catch (error: any) {
			if (error?.response?.status === 401) {
				navigate("/login");
			} else {
				console.error("Error editing meal", error?.response?.data?.error);
				setError(error?.response?.data?.error);
			}
		}
	}

	function handleBack(e: React.FormEvent<HTMLSpanElement>) {
		e.preventDefault();
		navigate(`/user/personalized/${id}`);
	}
	return (
		<div className="edit-personalized">
			<div className="section p-10">
				<span
					className="material-symbols-outlined absolute left-4 top-4 mb-5 p-2 cursor-pointer hover:cursor-pointer rounded-3xl hover:bg-[#e4e4e42c]"
					onClick={handleBack}
				>
					arrow_back
				</span>
				<h1 className="text-center font-bold text-2xl pb-5">Edit this meal</h1>
				{error && <p className="text-red-700 text-sm text-center">{error}</p>}
				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center gap-3 min-w-full "
				>
					{/* input for meal name */}
					<div>
						<div className="mb-2 block">
							<Label value="Meal name" className="text-white" />
						</div>
						<input
							id="name"
							name="name"
							type="text"
							value={name}
							placeholder="Meal name"
							required
							onChange={(e) => setName(e.target.value)}
							className="max-w-[500px] w-full px-10 rounded-lg text-black"
						/>
					</div>

					{/* textarea for ingredients */}
					<div className="max-w-md">
						<div className="mb-2 block">
							<Label value="Ingredients" className="text-white" />
						</div>
						<textarea
							id="ingredients"
							name="ingredients"
							value={ingredients}
							required
							rows={4}
							placeholder="Ingredients"
							onChange={(e) => setIngredients(e.target.value)}
							className="max-w-[500px] w-full px-10 rounded-lg text-black"
						/>
						{!ingredientsMessage ? (
							<p className="text-red-700 text-[13px]">
								*Ingredients should be comma-separated <br />
								values.
							</p>
						) : (
							<p className="text-yellow-400 text-[13px]">
								*Comma-separated values
							</p>
						)}
					</div>
					{/* textarea for steps*/}
					<div className="max-w-md">
						<div className="mb-2 block">
							<Label value="Steps" className="text-white" />
						</div>
						<textarea
							id="steps"
							name="steps"
							value={steps}
							required
							rows={4}
							placeholder="Steps"
							onChange={(e) => setSteps(e.target.value)}
							className="max-w-[500px] w-full px-10 rounded-lg text-black"
						/>
						{!stepsMessage ? (
							<p className="text-red-700 text-[13px]">
								*Steps should begin on a new line
								<br /> without numbering.
							</p>
						) : (
							<p className="text-yellow-400 text-[13px]">
								*Begin each step on a new line, no numbering
							</p>
						)}
					</div>

					<button
						className="p-2 w-full max-w-[250px] rounded-md bg-yellow-400 hover:bg-yellow-500 font-semibold"
						type="submit"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditPersonalized;
