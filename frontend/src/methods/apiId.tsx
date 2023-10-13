import axios from "axios";

export async function fetchId() {
	const baseUrl = "https://api.spoonacular.com/recipes";

	// Create an array to store the promises for each fetch request
	const fetchPromises = [];

	for (let id = 1; id <= 7; id++) {
		if (id == 5) {
			continue;
		} else if (id == 7) {
			continue;
		} else if (id == 8) {
			continue;
		}
		const url = `${baseUrl}/${id}/summary/?apiKey=417f028c16d94d9798ec04935a934af2`;
		try {
			const response = await axios.get(url);
			console.log(response);
			fetchPromises.push(response);
		} catch (error) {
			console.log(error);
			throw new Error("Something went wrong" + error);
		}
	}

	Promise.all(fetchPromises)
		.then((recipeSummaries) => {
			console.log(recipeSummaries);
		})
		.catch((error) => {
			console.error(error);
		});
}
