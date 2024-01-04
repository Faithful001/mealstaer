import axios from "axios";
import { Label, TextInput, Spinner } from "flowbite-react";
import { useState } from "react";
import { URL } from "../utils/methods/url/URL";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

const ForgotPassword = () => {
	const prodURL = URL.prodURL;
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [email, setEmail] = useState<string>("");
	const [error, setError] = useState<any>(null);
	const [message, setMessage] = useState<string>("");

	const body = { email };

	async function requestOTP() {
		try {
			const response = await axios.post(
				`${prodURL}/api/auth/recover-account`,
				body,
				{
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
			// console.log(response.data);
			if (response.status === 200) {
				setError("");
				setMessage(response.data?.message);
				const stringifiedUser = JSON.stringify(
					response.data?.returnData?.user_id
				);
				localStorage.setItem("user_id", stringifiedUser);
				setTimeout(() => {
					navigate("/verify-otp");
				}, 2000);
				return response.data;
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

	const { mutate, isLoading } = useMutation(requestOTP, {
		onSuccess: () => {
			queryClient.invalidateQueries("request otp");
		},
		onError: (error) => {
			console.error(error);
		},
	});

	function handleRequestOTP(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		mutate();
	}

	function handleBack(e: React.FormEvent<HTMLSpanElement>) {
		e.preventDefault();
		navigate(-1);
	}

	return (
		<div className="forgot-password flex flex-col items-center justify-center">
			<span
				className="material-symbols-outlined absolute left-4 top-4 mb-5 p-2 cursor-pointer hover:cursor-pointer rounded-3xl hover:bg-[#e4e4e42c]"
				onClick={handleBack}
			>
				arrow_back
			</span>
			<p className="font-bold text-2xl text-center pb-2">Request an OTP</p>
			<form
				className="flex max-w-md flex-col gap-4 min-w-[200px]"
				onSubmit={handleRequestOTP}
			>
				<div>
					<div className="mb-2 block">
						<Label className="text-white" htmlFor="email1" value="Your email" />
					</div>
					<TextInput
						id="email1"
						placeholder="example@gmail.com"
						required
						type="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<button
					className="p-2 rounded-md bg-yellow-400 hover:bg-yellow-500 font-semibold"
					type="submit"
				>
					{isLoading ? <Spinner /> : "Request OTP"}
				</button>
			</form>
			{error && <p className="text-red-600"> {error} </p>}
			{message && <p className=""> {message} </p>}
		</div>
	);
};

export default ForgotPassword;
