// "use client";
import { Label, TextInput, Spinner } from "flowbite-react";
import google_icon from "../assets/google_icon.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { URL } from "../utils/methods/url/URL";
import { useMutation, useQueryClient } from "react-query";
import localStorageUtil from "../utils/localStorage.util";

const Login = () => {
  const prodURL = URL.prodURL;
  // const [user, setUser] = useState<any>(null);
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>("");
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  console.log(email, password);
  //

  function handleVisibility() {
    setVisible(!visible);
  }
  async function signInWithGoogle() {
    window.open(`${prodURL}/api/auth/google`, "_self");
    console.log("inside signin with google");
    await getUser();
  }

  // const setCookie = (name: string, value: string, days: number) => {
  // 	const expirationDate = new Date();
  // 	expirationDate.setDate(expirationDate.getDate() + days);

  // 	const cookieValue = `${encodeURIComponent(name)}=${encodeURIComponent(
  // 		value
  // 	)};expires=${expirationDate.toUTCString()};path=/`;

  // 	document.cookie = cookieValue;
  // };

  async function getUser() {
    try {
      const response = await axios.get(`${prodURL}/api/auth/login/success`, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(response.data);
      if (response.status == 200) {
        const user = response.data.user;
        const token = response.data.token;
        localStorageUtil.addToStorage("user", user);
        localStorageUtil.addToStorage("token", token);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error?.message ?? error);
    }
  }
  // getUser();

  const body = { email, password };
  async function login() {
    try {
      const response = await axios.post(`${prodURL}/api/auth/login`, body, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log("login success");
      if (response.status === 200) {
        const user = response.data.user;
        const token = response.data.token;
        localStorageUtil.addToStorage("user", user);
        localStorageUtil.addToStorage("token", token);
        // navigate("/");
        return response.data;
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.error);
        setError(error.response.data.error);
      } else {
        console.log(error.message);
        setError(error.message);
      }
    }
  }

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries("login");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate();
  }

  return (
    <div className="flex flex-col items-center justify-center login">
      <div className="section flex flex-col items-center justify-center p-10 px-20 outline outline-1 outline-slate-500 bg-[#2c2c2c] rounded-lg">
        <p className="text-red-600"> {error} </p>
        {/* login form */}
        <form
          className="flex max-w-md flex-col gap-4 min-w-[200px]"
          onSubmit={handleLogin}
        >
          <div>
            <div className="block mb-2">
              <Label
                className="text-white"
                htmlFor="email1"
                value="Your email"
              />
            </div>
            <TextInput
              id="email1"
              placeholder="example@gmail.com"
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label
                className="text-white"
                htmlFor="password1"
                value="Your password"
              />
            </div>
            <div className="relative">
              <TextInput
                id="password1"
                required
                type={visible ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!visible ? (
                <span
                  onClick={handleVisibility}
                  className="absolute pl-5 text-xl text-black cursor-pointer material-symbols-outlined top-2 right-2"
                >
                  visibility_off
                </span>
              ) : (
                <span
                  onClick={handleVisibility}
                  className="absolute pl-5 text-xl text-black cursor-pointer material-symbols-outlined top-2 right-2"
                >
                  visibility
                </span>
              )}
            </div>
          </div>
          {/* <div className="flex items-center gap-2">
						<Checkbox id="remember" />
						<Label className="text-white" htmlFor="remember">
							Remember me
						</Label>
					</div> */}
          <span className="flex flex-col items-end w-full text-sm">
            <Link className="text-right underline " to={"/forgot-password"}>
              Forgot Password
            </Link>
          </span>

          <button
            className="p-2 font-semibold bg-yellow-400 rounded-md hover:bg-yellow-500"
            type="submit"
          >
            {isLoading ? <Spinner /> : "Login"}
          </button>
        </form>

        <span className="mt-2 text-sm">
          Don't have an account?{" "}
          <Link className="underline" to={"/signup"}>
            Signup
          </Link>
        </span>

        <span className="mt-2 -mb-5 ">or</span>

        <div
          className="relative flex items-center cursor-pointer"
          onClick={signInWithGoogle}
        >
          <img
            src={google_icon}
            alt=""
            className="h-[25px] absolute top-[48px] left-[12px] z-10"
          />
          <button className="mt-10 p-[10px] pl-[40px] px-[20px] rounded-lg text-sm font-semibold hover:bg-slate-200 bg-white text-[#303030]">
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
