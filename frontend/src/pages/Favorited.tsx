import { useEffect, useState } from "react";
// import { useFavorite } from "../contexts/FavoriteContext";
import axios from "axios";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../utils/methods/url/URL";
import localStorageUtil from "../utils/localStorage.util";

const Favorited = () => {
	const prodURL = URL.prodURL;
	const [faves, setFaves] = useState<any>([]);
	const navigate = useNavigate();

	// const { favorites } = useFavorite();
	// console.log(favorites);
	// const favoritedArray = favorites ? Array.from(favorites) : [];
	// console.log(favoritedArray);

	async function getAllFavorites() {
		const token = localStorageUtil.getFromStorage("token");
		try {
			const response = await axios.get(`${prodURL}/api/fave/`, {
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response.data);
			return response?.data;
		} catch (error: any) {
			if (error.response.status == 401) {
				navigate("/login");
			} else {
				console.log(error?.message);
			}
		}
	}

	const { isLoading, error, data } = useQuery("all favorites", getAllFavorites);
	console.log(isLoading, error);

	useEffect(() => {
		if (data) {
			setFaves(data);
		}
	}, [data]);

	function handleBack(e: React.FormEvent<HTMLSpanElement>) {
		e.preventDefault();
		navigate("/");
	}
	return (
		<div className="favorited p-7">
			<div className="section">
				<span
					className="material-symbols-outlined mb-5 p-2 cursor-pointer hover:cursor-pointer rounded-3xl hover:bg-[#e4e4e42c]"
					onClick={handleBack}
				>
					arrow_back
				</span>
				<h1 className="text-center font-bold text-2xl pb-5">
					All your favorite Meals
				</h1>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white mt-8">
					{faves && faves?.length < 1 ? (
						<div className="text-center text-xl">
							You don't have any favorite meal yet chef
						</div>
					) : isLoading ? (
						<p className="text-3xl font-bold mb-5">...Loading</p>
					) : (
						faves.map((fave: any) => (
							// <div className="">
							<div
								key={fave._id}
								className="bg-[#424242] rounded-lg p-5 px-20 py-8 flex justify-center items-center"
							>
								<Link to={`/user/favorite/${fave._id}`}>
									<div className="">
										<h2 className="text-xl mb-3">{fave.name}</h2>
									</div>
								</Link>
							</div>
							// </div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Favorited;
