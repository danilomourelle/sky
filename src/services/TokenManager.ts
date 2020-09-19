import * as jwt from "jsonwebtoken";

export class TokenManager {
  public generateToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRE_TIME
    });
  }

  public retrieveDataFromToken(token: string): TokenRetrievedData {
    const data = jwt.verify(token, process.env.JWT_KEY as string) as any;
    return {
      id: data.id,
      email: data.email
    }
  }
}

export interface TokenRetrievedData {
  id: string,
  email: string
}
