import { useState, useEffect } from "react";
import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Recommended from "./Recommended";
import PreContent from "./PreContent";
import ByYou from "../pages/ByYou";
import ForYou from "../pages/ForYou";

function queryParam() {
	return new URLSearchParams(useLocation().search);
}

const Home = () => {
	const [user_name, setUsername] = useState("");
	const { toast: otherToast } = useToast();
	const navigate = useNavigate();

	useEffect(() => {
		if (otherToast !== "") {
			toast(otherToast);
		}
	}, [otherToast]);

	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			const userObject = JSON.parse(user);
			const user_name = userObject.user_name;
			const firstName = user_name.split(" ")[0];
			setUsername(firstName);
		}
	}, []);

	const query = queryParam().get("tab");

	const switchToForYou = () => {
		navigate("/");
	};

	const switchToByYou = () => {
		navigate("/?tab=by-you");
	};

	return (
		<div className="home">
			<NavBar />
			<ToastContainer />
			<PreContent user_name={user_name} />
			<Recommended />
			<div className="px-5">
				<button
					className={`${
						query === "by-you"
							? "border-2 border-white bg-transparent text-white"
							: "bg-white text-black"
					} rounded-3xl p-2 px-4 cursor-pointer text-sm`}
					onClick={() => switchToForYou()}
				>
					For You
				</button>
				<button
					className={`${
						query === "by-you"
							? "bg-white text-black"
							: "border-2 border-white bg-transparent text-white"
					} rounded-3xl p-2 px-4 cursor-pointer text-sm ml-3`}
					onClick={() => switchToByYou()}
				>
					By You
				</button>
			</div>
			{query === "by-you" ? <ByYou name={query} /> : <ForYou />}
		</div>
	);
};

export default Home;
