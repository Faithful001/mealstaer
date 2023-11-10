import { useState } from "react";
import { useMeal } from "../contexts/MealContext";
import { Link } from "react-router-dom";

const NavBar = () => {
	const [search, setSearch] = useState<string>("");
	const [dropDown, setDropDown] = useState<boolean>(false);
	const {
		value,
		setSearchValue = () => {},
		// setNotSearchValue = () => {},
	} = useMeal();
	console.log(search);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
		if (value) {
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
	return (
		<div className="navbar">
			<div className="section p-5 py-6">
				<div className="flex justify-between items-center">
					<div className="flex">
						<span className="material-symbols-outlined mr-1 text-yellow-400">
							award_star
						</span>
						<h1 className="">mealstar</h1>
					</div>
					<div className="flex items-center relative">
						{/* <form onSubmit={handleSubmit}> */}
						<input
							className="bg-transparent border-white border md:w-[300px] w-[180px] rounded-3xl"
							type="text"
							onChange={handleChange}
							placeholder="Search for your favourite meal..."
						/>
						{search.length > 0 ? (
							<span className="material-symbols-outlined absolute right-0 md:right-0 p-2 hidden hover:cursor-pointer rounded-3xl hover:bg-[#e4e4e42c]">
								search
							</span>
						) : (
							<span className="material-symbols-outlined absolute right-0 md:right-0 p-2 hover:cursor-pointer rounded-3xl hover:bg-[#e4e4e42c]">
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
							<Link to={"/add-new-meal"}>
								<div className="flex items-center mb-3 cursor-pointer">
									<span className="material-symbols-outlined text-black">
										add_box
									</span>
									<p className="text-black ml-2">Add Your Meal</p>
								</div>
							</Link>

							<Link to={"/user/favorite"}>
								<div className="flex items-center mb-3 cursor-pointer">
									<span className="material-symbols-outlined text-black">
										favorite
									</span>
									<p className="text-black ml-2">Favourites</p>
								</div>
							</Link>

							<Link to={""}>
								<div className="flex items-center mb-3 cursor-pointer">
									<span className="material-symbols-outlined text-black">
										logout
									</span>
									<p className="text-black ml-2">Logout</p>
								</div>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavBar;
