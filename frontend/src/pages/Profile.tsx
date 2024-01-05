import localStorageUtil from "../utils/localStorage.util";

const Profile = () => {
	const user = localStorageUtil.getFromStorage("user");
	return (
		<div className="profile flex flex-col gap-4">
			<div className="">
				<p className="text-[#9b9b9b]">Name</p>
				<input
					className="text-base text-black p-2 rounded-md"
					value={user.user_name}
				/>
			</div>
			<div className="">
				<p className="text-base text-[#9b9b9b]">email</p>
				<input
					className="text-base text-black p-2 rounded-md"
					value={user.email}
				/>
			</div>
		</div>
	);
};

export default Profile;
