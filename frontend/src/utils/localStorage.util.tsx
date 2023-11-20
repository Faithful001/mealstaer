class localStorageClass {
	getFromStorage(name: string) {
		const data = localStorage.getItem(name);
		const parsedData = data && JSON.parse(data);
		return parsedData;
	}

	addToStorage(name: string, value: any) {
		const stringifiedValue = JSON.stringify(value);
		const data = localStorage.setItem(name, stringifiedValue);
		return data;
	}
}

export default new localStorageClass();
