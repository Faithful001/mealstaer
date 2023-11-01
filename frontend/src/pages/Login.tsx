"use client";

import { Checkbox, Label, TextInput } from "flowbite-react";
import google_icon from "../assets/google_icon.png";
import axios from "axios";

const Login = () => {
	const signInWithGoogle = async () => {
		window.open("http://localhost:4000/api/auth/google", "_self");

		// window.addEventListener("message", (event) => {
		// 	if (event.origin === "http://localhost:4000") {
		// 		console.log("Response data from child window: " + event.data);
		// 		localStorage.setItem("user", event.data);
		// 		newWindow?.close();
		// 	}
		// });
		try {
			const response = await axios.get(
				"http://localhost:4000/api/auth/google",
				{
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
			console.log(response.data);
			localStorage.setItem("user", response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="login flex flex-col items-center justify-center">
			<div className="section flex flex-col items-center justify-center p-10 px-20 outline outline-1 outline-slate-500 bg-[#2c2c2c] rounded-lg">
				{/* login form */}
				<form className="flex max-w-md flex-col gap-4 min-w-[200px]">
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
						<TextInput id="password1" required type="password" />
					</div>
					<div className="flex items-center gap-2">
						<Checkbox id="remember" />
						<Label className="text-white" htmlFor="remember">
							Remember me
						</Label>
					</div>
					<button
						className="p-2 rounded-md bg-yellow-400 hover:bg-yellow-400 font-semibold"
						type="submit"
					>
						Login
					</button>
				</form>

				<span className=" mt-2 -mb-5">or</span>

				<div
					className="flex cursor-pointer relative"
					onClick={signInWithGoogle}
				>
					<img
						src={google_icon}
						alt=""
						className="h-[25px] absolute top-[50px] ml-2 z-10"
					/>
					<button className="mt-10 p-[10px] pl-[38px] rounded-lg font-bold text-md bg-white text-[#282828]">
						Sign in with Google
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
