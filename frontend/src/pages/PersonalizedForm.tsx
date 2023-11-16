"use client";
import { Label } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../contexts/ToastContext";
import { URL } from "../utils/methods/url/URL";

const PersonalizedForm = () => {
	const prodURL = URL.prodURL;
	const navigate = useNavigate();
	const [name, setName] = useState<string>("");
	const [ingredients, setIngredients] = useState<string>("");
	const [ingredientsMessage, setIngredientsMessage] = useState<boolean>(true);
	const [steps, setSteps] = useState<string>("");
	const [stepsMessage, setStepsMessage] = useState<boolean>(true);
	const [error, setError] = useState<any>("");
	const { setToast = () => {} } = useToast();

	// console.log(steps);
	// console.log(ingredientsMessage);
	// console.log(stepsMessage);

	function formatSteps(steps: string) {
		const split = steps.split("\n");
		const formattedSteps = split.map((step) => step.trim());
		return formattedSteps;
	}
	function formatIngredients(ingredients: string) {
		const split = ingredients.split(",");
		const formattedSteps = split.map((ingredient) => ingredient.trim());
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
		const formattedIngredients = formatIngredients(ingredients);

		const personalizedMealData = {
			name,
			ingredients: formattedIngredients,
			steps: formattedSteps,
		};

		try {
			const response = await axios.post(
				`${prodURL}/api/personalized`,
				personalizedMealData,
				{
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				}
			);

			console.log("Meal added successfully", response.data);
			setToast(`${name} added successfully`);
			navigate("/?tab=by-you");
			return response.data;
		} catch (error: any) {
			if (error?.response?.status === 401) {
				navigate("/login");
			} else {
				console.error("Error adding meal", error?.response?.data?.error);
				setError(error?.response?.data?.error);
			}
		}
	}

	function handleBack(e: React.FormEvent<HTMLSpanElement>) {
		e.preventDefault();
		navigate("/");
	}

	return (
		<div className="personalized-form">
			<div className="section p-10">
				<ToastContainer />
				<span
					className="material-symbols-outlined absolute left-4 top-4 mb-5 p-2 cursor-pointer hover:cursor-pointer rounded-3xl hover:bg-[#e4e4e42c]"
					onClick={handleBack}
				>
					arrow_back
				</span>
				<h1 className="text-center font-bold text-2xl pb-5">
					Add your own meal
				</h1>
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

export default PersonalizedForm;
