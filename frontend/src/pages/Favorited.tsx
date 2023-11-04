import { useFavorite } from "../contexts/FavoriteContext";

const Favorited = () => {
	const { favorites } = useFavorite();

	console.log(favorites);

	const favoritedArray = favorites ? Array.from(favorites) : [];
	console.log(favoritedArray);

	return (
		<div className="favorited p-7">
			<div className="section">
				<div>
					{favorites && favorites?.length < 1 ? (
						<div className="text-center font-bold text-2xl">
							You don't have any favorite meal yet chef
						</div>
					) : (
						favoritedArray.map((data: any) => (
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
								{!data.steps
									? "No steps"
									: data.steps.map((step: any, index: number) => (
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

export default Favorited;
