import { useState } from "react";
import { useMeal } from "../contexts/MealContext";
// import { useQuery } from "react-query";

const NavBar = () => {
	const [search, setSearch] = useState<string>("");
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
	return (
		<div className="navbar">
			<div className="section p-5 py-6">
				<div className="flex justify-between items-center">
					<h1>mealstar</h1>
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
					<p>profile</p>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
