import jwt from "jsonwebtoken";
require("dotenv").config();

class JWT {
	private readonly JWT_SEC: string;

	constructor(JWT_SEC: string) {
		this.JWT_SEC = JWT_SEC;
	}

	createToken(_id: string) {
		return jwt.sign({ _id }, this.JWT_SEC, { expiresIn: "2d" });
	}

	verifyToken(_id: string) {
		return jwt.verify({ _id }, this.JWT_SEC);
	}
}

export default new JWT(process.env.JWT_SEC);
