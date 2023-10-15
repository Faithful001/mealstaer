import { useState } from "react";
import { useMeal } from "../contexts/MealContext";
import { Link } from "react-router-dom";
// import { useQuery } from "react-query";

const NavBar = () => {
	const [search, setSearch] = useState<string>("");
	const [dropDown, setDropDown] = useState<boolean>(false);
	const { setValue = () => {}, setNotValue = () => {} } = useMeal();
	// console.log(search);

	// function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
	// 	e.preventDefault();
	// 	const data = localStorage.getItem("meals");
	// 	if (data) {
	// 		const parsedData = JSON.parse(data);
	// 		console.log(parsedData);
	// 		const newData = parsedData.filter((item: any) =>
	// 			item.name.toLowerCase().includes(search)
	// 		);
	// 		console.log(newData);
	// 		setValue && setValue(newData);
	// 		setNotValue("");

	// 	}
	// }

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
		const data = localStorage.getItem("meals");
		if (data) {
			const parsedData = JSON.parse(data);
			console.log(parsedData);
			const newData = parsedData.filter((item: any) =>
				item.name.toLowerCase().includes(search)
			);
			console.log(newData);
			setValue && setValue(newData);
			setNotValue("");
			// if (newData) {
			// 	parsedData.filter(
			// 		(item: any) => !item.name.toLowerCase().includes(search)
			// 	);
			// 	setNotValue && setNotValue("Meal not found");
			// 	setValue([]);
			// }
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
						{/* <div className="">
							<Link to={""} className="underline">
								Login
							</Link>
							/
							<Link to={""} className="underline">
								Signup
							</Link>
						</div> */}
						<span
							className="material-symbols-outlined text-4xl cursor-pointer ml-2"
							onClick={handleDropDown}
						>
							account_circle
						</span>
					</div>
					{dropDown && (
						<div
							className="bg-white rounded-md p-10 pt-20 pb-20 flex flex-col
					 absolute right-5 top-[72px] z-10"
						>
							<Link to={""}>
								<div className="flex items-center mb-3 cursor-pointer">
									<span className="material-symbols-outlined text-black">
										bookmarks
									</span>
									<p className="text-black ml-2">Saved for Later</p>
								</div>
							</Link>

							<Link to={""}>
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
