import food from "../assets/food2.png";
import { Link } from "react-router-dom";

const ErrorPage = () => {
	return (
		<div className="error-page flex flex-col items-center justify-center">
			<div className="items-center justify-center flex flex-col">
				<img className="h-20 -mb-8" src={food} alt="" />
				<h1 className="text-[8rem] -mb-5 font-bold">404</h1>
				<p className="text-[1rem] font-light">
					There are no meals here chief 😢
				</p>
				<Link to={"/"}>
					<button className="mt-5 transition-all duration-500 outline-none outline-offset-1 bg-yellow-400 hover:bg-yellow-500 py-2 px-7 rounded text-black font-semibold text-sm">
						Find meals here 🚀
					</button>
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
