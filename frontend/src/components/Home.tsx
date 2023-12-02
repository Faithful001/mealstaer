import { useState, useEffect } from "react";
import { useToast } from "../contexts/ToastContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./NavBar";
import Recommended from "./Recommended";
import PreContent from "./PreContent";

// function queryParam() {
// 	return new URLSearchParams(useLocation().search);
// }

const Home = () => {
	const [user_name, setUsername] = useState("");
	const { toast: otherToast } = useToast();
	// const navigate = useNavigate();

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

	// const query = queryParam().get("tab");

	return (
		<div className="home">
			<NavBar />
			<ToastContainer />
			<PreContent user_name={user_name} />
			<Recommended />
		</div>
	);
};

export default Home;
