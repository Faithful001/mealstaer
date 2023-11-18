class localStorageClass {
	getFromStorage(name: string) {
		const data = localStorage.getItem(name);
		const parsedData = data && JSON.parse(data);
		return parsedData;
	}
}

export default new localStorageClass();
