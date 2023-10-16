import { useFavorite } from "../contexts/FavoriteContext";

const Saved = () => {
	const { saved } = useFavorite();

	console.log(saved);

	const savedArray = saved ? Array.from(saved) : [];

	return (
		<div className="saved p-7">
			<div className="section">
				<div>
					{saved && saved?.size < 1 ? (
						<div className="text-center font-bold text-2xl">
							You don't have any saved meal yet chef
						</div>
					) : (
						savedArray.map((data: any) => (
							<div key={data.id}>
								<h1 className="text-3xl font-bold mb-5">
									{data.name || "No Name"}
								</h1>
								<p className="text-xl font-bold">
									Ingredients: <br />
								</p>
								{data.ingredients
									? data.ingredients.join(", ")
									: "No Ingredients"}
								<p className="text-xl mt-5 font-bold">Steps:</p>
								{data.steps &&
									data.steps.map((step: any, index: number) => (
										<li key={index}>{step}</li>
									))}
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Saved;
