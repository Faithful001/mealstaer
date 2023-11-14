// // import mongoose from "mongoose";
// const UserGoogle = require("../models/userModelGoogle");
// // const login = async (req, res) => {
// // 	try {
// // 	} catch (error) {}
// // };
// const loginWithGoogle = async (req, res) => {
// 	try {
// 		const { user_name, email } = req.body;
// 		const user = new UserGoogle({ user_name, email });
// 		const exists = await UserGoogle.findOne({ email });
// 		if (exists) {
// 			res.status(200).json(user);
// 		}
// 		const userData = await user.save();
// 		// if (req.ok) {
// 		res.status(200).json(userData);
// 		// } else {
// 		// 	res.status(400).json({ error: "Something went wrong" });
// 		// }
// 	} catch (error) {
// 		res.status(500).json({ error: "Something went wrong " + error });
// 	}
// };
// module.exports = loginWithGoogle;
//# sourceMappingURL=userControllerGoogle.js.map