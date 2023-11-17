"use client";

import { Label, TextInput } from "flowbite-react";
import google_icon from "../assets/google_icon.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { URL } from "../utils/methods/url/URL";

const Login = () => {
	const prodURL = URL.prodURL;
	// const [user, setUser] = useState<any>(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<any>("");
	const navigate = useNavigate();
	console.log(email, password);

	const signInWithGoogle = async () => {
		window.open(`${prodURL}/api/auth/google`, "_self");
		getUser();
	};

	// const setCookie = (name: string, value: string, days: number) => {
	// 	const expirationDate = new Date();
	// 	expirationDate.setDate(expirationDate.getDate() + days);

	// 	const cookieValue = `${encodeURIComponent(name)}=${encodeURIComponent(
	// 		value
	// 	)};expires=${expirationDate.toUTCString()};path=/`;

	// 	document.cookie = cookieValue;
	// };

	async function getUser() {
		const response = await axios.get(`${prodURL}/api/auth/login/success`, {
			withCredentials: true,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
		console.log(response.data);
		if (response.status == 200) {
			const cookieName = "sessions";
			const cookieValue = response?.data?.session;
			const expirationDate = new Date();
			expirationDate.setDate(expirationDate.getDate() + 2);

			const expires = `expires=${expirationDate.toUTCString()}`;

			document.cookie = `${cookieName}=${cookieValue}; path=/; HttpOnly; ${expires}; `;

			console.log(document.cookie);
			const parsedUser = JSON.stringify(response.data.user);
			localStorage.setItem("user", parsedUser);
		}
	}
	// getUser();

	const body = { email, password };
	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${prodURL}/api/auth/login`, body, {
				withCredentials: true,
			});
			console.log(response.data.session);
			if (response.status == 200) {
				const cookieName = "sessions";
				const cookieValue = response?.data?.session;
				const expirationDate = new Date();
				expirationDate.setDate(expirationDate.getDate() + 2);

				const expires = `expires=${expirationDate.toUTCString()}`;

				document.cookie = `${cookieName}=${cookieValue}; path=/; HttpOnly; ${expires}; `;

				console.log(document.cookie);

				const parsedUser = JSON.stringify(response.data.user);
				localStorage.setItem("user", parsedUser);
				navigate("/");
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
	};

	return (
		<div className="login flex flex-col items-center justify-center">
			<div className="section flex flex-col items-center justify-center p-10 px-20 outline outline-1 outline-slate-500 bg-[#2c2c2c] rounded-lg">
				<p className="text-red-600"> {error} </p>
				{/* login form */}
				<form
					className="flex max-w-md flex-col gap-4 min-w-[200px]"
					onSubmit={handleLogin}
				>
					<div>
						<div className="mb-2 block">
							<Label
								className="text-white"
								htmlFor="email1"
								value="Your email"
							/>
						</div>
						<TextInput
							id="email1"
							placeholder="example@gmail.com"
							required
							type="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label
								className="text-white"
								htmlFor="password1"
								value="Your password"
							/>
						</div>
						<TextInput
							id="password1"
							required
							type="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{/* <div className="flex items-center gap-2">
						<Checkbox id="remember" />
						<Label className="text-white" htmlFor="remember">
							Remember me
						</Label>
					</div> */}
					<button
						className="p-2 rounded-md bg-yellow-400 hover:bg-yellow-500 font-semibold"
						type="submit"
					>
						Login
					</button>
				</form>
				<span className="text-sm mt-2">
					Don't have an account?{" "}
					<Link className="underline" to={"/signup"}>
						Signup
					</Link>
				</span>

				<span className=" mt-2 -mb-5">or</span>

				<div
					className="flex cursor-pointer items-center relative"
					onClick={signInWithGoogle}
				>
					<img
						src={google_icon}
						alt=""
						className="h-[25px] absolute top-[48px] left-[12px] z-10"
					/>
					<button className="mt-10 p-[10px] pl-[40px] px-[20px] rounded-lg text-sm font-semibold hover:bg-slate-200 bg-white text-[#303030]">
						Sign in with Google
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
