import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { app } from "../components/Firebase";

const Login = () => {
	const { dispatch } = useAuth();
	const auth = getAuth(app);
	const provider = new GoogleAuthProvider();

	const signInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				const user = result.user;
				console.log(user);
				if (user) {
					const name = user.displayName || "";
					const email = user.email || "";

					localStorage.setItem("name", name);
					localStorage.setItem("email", email);
					const body = {
						user_name: name,
						email: email,
					};
					const bodyString = JSON.stringify(body);
					if (name && email) {
						axios
							.post("http://localhost:4000/api/user/login-google", body, {
								headers: {
									withCredentials: true,
									"Cross-Origin-Opener-Policy": "same-origin-allow-popups",
								},
							})
							.then((response) => {
								console.log(response.data);
								dispatch({ type: "LOGIN", payload: body });
								localStorage.setItem("user", bodyString);
							})
							.catch((error) => {
								console.log(error);
							});
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="login">
			<div className="section flex items-center justify-center">
				<button
					className="mt-10 p-5 rounded-xl font-bold bg-white text-black"
					onClick={signInWithGoogle}
				>
					Sign up with Google
				</button>
			</div>
		</div>
	);
};

export default Login;
