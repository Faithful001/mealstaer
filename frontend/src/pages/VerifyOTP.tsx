import axios from "axios";
import { Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { URL } from "../utils/methods/url/URL";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import OtpInput from "react18-input-otp";
import localStorageUtil from "../utils/localStorage.util";

const VerifyOTP = () => {
	const prodURL = URL.prodURL;
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [otp, setOTP] = useState<string>("");
	const [error, setError] = useState<any>(null);

	console.log(otp);

	const handleChange = (enteredOtp: string) => {
		setOTP(enteredOtp);
	};

	useEffect(() => {
		const number = /[\d]/.test(otp);
		if (!number) {
			setOTP("");
			setError("Only numbers are expected");
		} else {
			setError("");
		}
	}, [otp]);

	const [message, setMessage] = useState<string>("");

	const user_id = localStorageUtil.getFromStorage("user_id");
	// const parsedUserId = user_id && JSON.parse(user_id);
	const body = { otp, otp_user_id: user_id };

	async function requestOTP() {
		try {
			const number = /[\d]/.test(otp);
			if (!number) {
				setOTP("");
				setError("Only numbers are expected");
			} else {
				setError("");
			}
			const response = await axios.post(
				`${prodURL}/api/auth/verify-otp`,
				body,
				{
					withCredentials: true,
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
			console.log(response);
			const token = response?.data?.token;
			localStorageUtil.addToStorage("password_reset_token", token);

			console.log(response.data);
			if (response.status === 200) {
				setError("");
				setMessage(response.data?.message);

				const email = response.data?.returnData.email;

				localStorageUtil.addToStorage("user_email", email);
				setTimeout(() => {
					navigate("/reset-password");
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

	function handleVerifyOTP(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		mutate();
	}

	function handleBack(e: React.FormEvent<HTMLSpanElement>) {
		e.preventDefault();
		navigate(-1);
	}

	return (
		<div className="verify-otp flex flex-col items-center justify-center">
			<span
				className="material-symbols-outlined absolute left-4 top-4 mb-5 p-2 cursor-pointer hover:cursor-pointer rounded-3xl hover:bg-[#e4e4e42c]"
				onClick={handleBack}
			>
				arrow_back
			</span>
			<p className="font-bold text-2xl text-center pb-2">Verify OTP</p>
			<form
				className="flex max-w-md flex-col gap-4 min-w-[200px]"
				onSubmit={handleVerifyOTP}
			>
				<div className="flex flex-col items-center justify-center">
					<div className="mb-2 block text-left">
						<Label
							className="text-white"
							htmlFor="otp"
							value="Enter the OTP sent to your email"
						/>
					</div>
					<div className="flex flex-col items-center justify-center h-20">
						<OtpInput
							value={otp}
							onChange={handleChange}
							numInputs={4}
							separator={<span>-</span>}
							inputStyle={"otp-input text-4xl text-black rounded"}
						/>
					</div>
				</div>
				<button
					className="p-2 rounded-md bg-yellow-400 hover:bg-yellow-500 font-semibold"
					type="submit"
				>
					{isLoading ? <Spinner /> : "Verify OTP"}
				</button>
			</form>
			{error && <p className="text-red-600"> {error} </p>}
			{message && <p className=""> {message} </p>}
		</div>
	);
};

export default VerifyOTP;
