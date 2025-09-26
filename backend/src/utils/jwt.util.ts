import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
require("dotenv").config();

interface MyJwtPayload extends JwtPayload {
  _id: string;
}

class JWT {
  private readonly JWT_SEC: Secret;

  constructor(JWT_SEC: string) {
    this.JWT_SEC = JWT_SEC as Secret;
  }

  /** Create a signed token */
  createToken(_id: string, expiresIn: SignOptions["expiresIn"]): string {
    return jwt.sign({ _id }, this.JWT_SEC, { expiresIn });
  }

  /** Verify a token and return the payload */
  verifyToken(token: string): MyJwtPayload {
    return jwt.verify(token, this.JWT_SEC) as MyJwtPayload;
  }
}

export default new JWT(process.env.JWT_SEC ?? "");
