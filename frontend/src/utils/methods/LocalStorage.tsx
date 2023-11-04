// export class LocalStorage {
export function saveToLocalStorage(res: any, storeName: string) {
	const faveData: any[] = [];
	const allFaves = localStorage.getItem(storeName);
	if (allFaves) {
		const parsedData = JSON.parse(allFaves);
		faveData.push(parsedData);
		faveData.push(res);
	}
	const stringifiedData = JSON.stringify(faveData);
	localStorage.setItem(storeName, stringifiedData);
}

export function getFromLocalStorge(storeName: string) {
	const data: any = localStorage.getItem(storeName);
	const parsedData = JSON.parse(data);
	return parsedData;
}
// }
