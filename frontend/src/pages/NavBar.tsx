const NavBar = () => {
	return (
		<div className="navbar">
			<div className="section p-5">
				<div className="flex justify-between items-center">
					<h1>mealstar</h1>

					<input
						className="bg-transparent border-white border rounded-2xl"
						type="text"
					/>
					<p>profile</p>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
