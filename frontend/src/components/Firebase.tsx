import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";

const firebaseConfig = {
	apiKey: "AIzaSyAgsMbURx4Ft1jYWTDIsn3VH0WqhK04hIA",
	authDomain: "mealstaer.firebaseapp.com",
	projectId: "mealstaer",
	storageBucket: "mealstaer.appspot.com",
	messagingSenderId: "254972707211",
	appId: "1:254972707211:web:8dd99cce9490f613676f8e",
	measurementId: "G-J6017PXNJK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () => {
// 	const { dispatch } = useAuth();
// 	signInWithPopup(auth, provider)
// 		.then((result) => {
// 			const user = result.user;
// 			if (user) {
// 				const name = user.displayName || "";
// 				const email = user.email || "";

// 				localStorage.setItem("name", name);
// 				localStorage.setItem("email", email);
// 				const body = { name, email };

// 				axios
// 					.post("http://localhost:4000/api/user", body)
// 					.then((response) => {
// 						console.log(response.data);
// 						dispatch({ type: "LOGIN", payload: response.data });
// 						localStorage.setItem("user", response.data);
// 					})
// 					.catch((error) => {
// 						console.log(error);
// 					});
// 			}
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// };
