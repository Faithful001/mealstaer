function isAuthorized() {
	const cookies = document.cookie.split("; ");
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i];
		if (cookie.startsWith("connect.sid=")) {
			return cookie.split("=")[1];
		}
	}
}
