import { useState } from "react";
import { useMeal } from "../contexts/MealContext";
import { Link, useNavigate } from "react-router-dom";
import { NavBarProfileData } from "../data/NavBarProfileData";
import { NavBarProfileInterface } from "../interfaces/NavBarProfile.interface";
// import axios from "axios";
// import { URL } from "../utils/methods/url/URL";

const NavBar = () => {
	// const prodURL = URL.prodURL;
	// const [search, setSearch] = useState<string>("");
	const [dropDown, setDropDown] = useState<boolean>(false);
	const navigate = useNavigate();

	const {
		search,
		setSearch = () => {},
		value,
		setSearchValue = () => {},
		// setNotSearchValue = () => {},
	} = useMeal();
	console.log(search);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
		// if (!search) {
		// 	return null;
		// }
		if (value && search) {
			const newValue = value.filter((item: any) =>
				item.name.toLowerCase().includes(search)
			);
			console.log(newValue);
			setSearchValue && setSearchValue(newValue);
		}
	}

	function handleDropDown(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
		e.preventDefault();
		setDropDown(!dropDown);
	}

	function logout() {
		navigate("/login");
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	}
	return (
		<div className="navbar">
			<div className="section p-5 py-6">
				<div className="flex justify-between items-center">
					<div className="flex">
						<span className="material-symbols-outlined mr-1 text-yellow-400">
							award_star
						</span>
						<h1 className="">mealstaer</h1>
					</div>
					<div className="flex items-center relative">
						{/* <form onSubmit={handleSubmit}> */}
						<input
							className="bg-transparent border-white border md:w-[300px] w-[180px] rounded-3xl"
							type="text"
							onChange={handleChange}
							placeholder="Search for a meal..."
						/>
						{search && search.length > 0 ? (
							<span className="material-symbols-outlined absolute right-0 md:right-0 p-2 hidden cursor-pointer rounded-3xl hover:bg-[#e4e4e42c]">
								search
							</span>
						) : (
							<span className="material-symbols-outlined absolute right-0 md:right-0 p-2 cursor-pointer rounded-3xl hover:bg-[#e4e4e42c]">
								search
							</span>
						)}
						{/* </form> */}
					</div>
					<div className="md:flex items-center">
						<span
							className="material-symbols-outlined text-4xl cursor-pointer ml-2"
							onClick={handleDropDown}
						>
							account_circle
						</span>
					</div>
					{dropDown && (
						<div
							className="bg-white rounded-md p-10 py-10 flex flex-col
					 absolute right-5 top-[72px] z-10"
						>
							{NavBarProfileData.map((data: NavBarProfileInterface) => (
								<Link to={`${data.link}`}>
									<div className="flex items-center mb-3 cursor-pointer">
										<span className="material-symbols-outlined text-black">
											{data.icon}
										</span>
										<p className="text-black ml-2">{data.name}</p>
									</div>
								</Link>
							))}

							<button onClick={logout}>
								<div className="flex items-center mb-3 cursor-pointer">
									<span className="material-symbols-outlined text-black">
										logout
									</span>
									<p className="text-black ml-2">Logout</p>
								</div>
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavBar;
