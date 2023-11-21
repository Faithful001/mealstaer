// "use client";

import { Label, TextInput } from "flowbite-react";
import google_icon from "../assets/google_icon.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { URL } from "../utils/methods/url/URL";

const Signup = () => {
	const prodURL = URL.prodURL;
	// const [user, setUser] = useState<any>(null);
	const [user_name, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [pwdRequirements, setPwdRequirements] = useState(false);
	const [pwdLength, setPwdLength] = useState(false);
	console.log(pwdLength);
	const [error, setError] = useState<any>("");
	const navigate = useNavigate();

	async function signInWithGoogle() {
		window.open(`${prodURL}/api/auth/google`, "_self");
		await getUser();
	}

	async function getUser() {
		const response = await axios.get(`${prodURL}/api/auth/login/success`, {
			withCredentials: true,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
		console.log(response.data);
		if (response.status == 200) {
			const stringifiedUser = JSON.stringify(response.data.user);
			const stringifiedToken = JSON.stringify(response.data.token);
			localStorage.setItem("user", stringifiedUser);
			localStorage.setItem("token", stringifiedToken);
		}
	}
	// getUser();

	const body = { user_name, email, password };
	async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:4000/api/auth/signup",
				body,
				{ withCredentials: true }
			);
			console.log(response);
			if (response.status == 200) {
				const stringifiedUser = JSON.stringify(response.data.user);
				const stringifiedToken = JSON.stringify(response.data.token);
				localStorage.setItem("user", stringifiedUser);
				localStorage.setItem("token", stringifiedToken);
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
	}

	function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value);
	}
	useEffect(() => {
		function checkPassword() {
			let isStrong = true;
			if (password.length < 8) {
				setPwdLength(false);
			} else {
				setPwdLength(true);
			}
			if (
				!/[A-Z]/.test(password) ||
				!/[a-z]/.test(password) ||
				!/[0-9]/.test(password) ||
				!/[!@#$%^&*]/.test(password)
			) {
				isStrong = false;
			}
			setPwdRequirements(isStrong);
		}

		checkPassword();
	}, [password]);

	return (
		<div className="login flex flex-col items-center justify-center">
			<div className="section flex flex-col items-center justify-center p-10 px-20 outline outline-1 outline-slate-500 bg-[#2c2c2c] rounded-lg">
				<p className="text-red-600"> {error} </p>
				{/* login form */}
				<form
					className="flex max-w-md flex-col gap-4 min-w-[200px]"
					onSubmit={handleSignup}
				>
					<div>
						<div className="mb-2 block">
							<Label
								className="text-white"
								htmlFor="email1"
								value="Your name"
							/>
						</div>
						<TextInput
							id="user_name1"
							placeholder="John Doe"
							required
							type="text"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
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
							placeholder="johndoe@gmail.com"
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
							onChange={handlePassword}
						/>
						<p
							className={`text-red-700 text-[12px] leading-4 mt-1 ${
								password.length > 0 && !pwdRequirements ? "block" : "hidden"
							}`}
						>
							*An uppercase letter, a lowercase letter, <br />a number and a
							symbol is required
						</p>
						<p
							className={`text-red-700 text-[12px] leading-4 mt-1 ${
								password.length > 0 && !pwdLength ? "block" : "hidden"
							}`}
						>
							*More than 8 character required
						</p>
					</div>
					{/* <div className="flex items-center gap-2">
						<Checkbox id="remember" />
						<Label className="text-white" htmlFor="remember">
							Remember me
						</Label>
					</div> */}
					<button
						className={`p-2 rounded-md bg-yellow-400 ${
							!pwdRequirements && !pwdLength ? "" : "hover:bg-yellow-500"
						} font-semibold`}
						type="submit"
						disabled={!pwdRequirements}
					>
						Signup
					</button>
				</form>
				<span className="text-sm mt-2">
					Have an account?{" "}
					<Link className="underline" to={"/login"}>
						Login
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

export default Signup;
