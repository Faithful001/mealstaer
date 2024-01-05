// "use client";
import { Label, TextInput, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/methods/url/URL";
import { useMutation, useQueryClient } from "react-query";
import localStorageUtil from "../utils/localStorage.util";

const ResetPassword = () => {
	const prodURL = URL.prodURL;
	// const [user, setUser] = useState<any>(null);
	const queryClient = useQueryClient();
	const [password, setPassword] = useState("");
	const [passwordTwo, setPasswordTwo] = useState("");
	const [error, setError] = useState<any>("");
	const [message, setMessage] = useState<string>("");
	const navigate = useNavigate();
	const [visible, setVisible] = useState(false);
	const [visibleTwo, setVisibleTwo] = useState(false);
	console.log("visible one", visible);
	console.log("visible two", visibleTwo);

	useEffect(() => {
		if (password !== passwordTwo) {
			setError("Passwords must be the same");
			// setPassword("");
		} else {
			setError("");
		}
	}, [password, passwordTwo]);

	function handleVisibility() {
		setVisible(!visible);
	}
	function handleVisibilityTwo() {
		setVisibleTwo(!visibleTwo);
	}

	const email = localStorageUtil.getFromStorage("user_email");
	console.log(email);
	const body = { email, password };

	const token = localStorageUtil.getFromStorage("password_reset_token");

	console.log(token);
	async function resetPassword() {
		try {
			const response = await axios.post(
				`${prodURL}/api/auth/reset-password`,
				body,
				{
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("password reset successful");
			if (response.status === 200) {
				setError("");
				setMessage("Password reset successful. Redirecting...");
				setTimeout(() => {
					navigate("/login");
				}, 3000);
				// return response.data;
			}
		} catch (error: any) {
			if (error.response) {
				console.log(error.response.data.error);
				setError(error.response.data.error);
			} else {
				console.log(error.message);
				setError(error.message);
			}
		}
	}

	const { mutate, isLoading } = useMutation(resetPassword, {
		onSuccess: () => {
			queryClient.invalidateQueries("reset-password");
		},
		onError: (error) => {
			console.error(error);
		},
	});

	function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		mutate();
	}

	function handleBack(e: React.FormEvent<HTMLSpanElement>) {
		e.preventDefault();
		navigate(-1);
	}

	return (
		<div className="reset-password flex flex-col items-center justify-center">
			<div className="section flex flex-col items-center justify-center">
				<span
					className="material-symbols-outlined absolute left-4 top-4 mb-5 p-2 cursor-pointer hover:cursor-pointer rounded-3xl hover:bg-[#e4e4e42c]"
					onClick={handleBack}
				>
					arrow_back
				</span>
				<form
					className="flex max-w-md flex-col gap-4 min-w-[200px]"
					onSubmit={handleResetPassword}
				>
					<div>
						<div className="mb-2 block">
							<Label
								className="text-white"
								htmlFor="password1"
								value="New password"
							/>
						</div>
						<div className="relative">
							<TextInput
								id="password1"
								required
								type={visible ? "text" : "password"}
								onChange={(e) => setPassword(e.target.value)}
							/>
							{!visible ? (
								<span
									onClick={handleVisibility}
									className="material-symbols-outlined absolute text-xl top-2 right-2 text-black pl-5 cursor-pointer"
								>
									visibility_off
								</span>
							) : (
								<span
									onClick={handleVisibility}
									className="material-symbols-outlined absolute text-xl top-2 right-2 text-black pl-5 cursor-pointer"
								>
									visibility
								</span>
							)}
						</div>
					</div>

					<div>
						<div className="mb-2 block">
							<Label
								className="text-white"
								htmlFor="password2"
								value="Confirm New password"
							/>
						</div>
						<div className="relative">
							<TextInput
								id="password2"
								required
								type={visibleTwo ? "text" : "password"}
								onChange={(e) => setPasswordTwo(e.target.value)}
							/>
							{!visibleTwo ? (
								<span
									onClick={handleVisibilityTwo}
									className="material-symbols-outlined absolute text-xl top-2 right-2 text-black pl-5 cursor-pointer"
								>
									visibility_off
								</span>
							) : (
								<span
									onClick={handleVisibilityTwo}
									className="material-symbols-outlined absolute text-xl top-2 right-2 text-black pl-5 cursor-pointer"
								>
									visibility
								</span>
							)}
						</div>
					</div>

					<button
						className="p-2 rounded-md bg-yellow-400 hover:bg-yellow-500 font-semibold"
						type="submit"
					>
						{isLoading ? <Spinner /> : "Reset Password"}
					</button>
				</form>
				{error && <p className="text-red-600"> {error} </p>}
				{message && <p className=""> {message} </p>}
			</div>
		</div>
	);
};

export default ResetPassword;
