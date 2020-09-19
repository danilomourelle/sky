import { TokenDatabase } from "../data/TokenDatabase";
import { IdManager } from "../services/IdManager";
import { Token } from "../model/Token";
import { TokenManager } from "../services/TokenManager";
import { NotFoundError } from "../errors/NotFoundError";

export class TokenBusiness {
  constructor(
    private tokenDatabase: TokenDatabase,
    private idManager: IdManager,
    private tokenManager: TokenManager
  ) { }

  public async insert(email: string, userId: string, now: string): Promise<string> {
    const id = this.idManager.generateId()

    const token = this.tokenManager.generateToken({
      id: userId,
      email
    })

    const newToken = new Token(
      id,
      token,
      now,
      now,
      userId
    )
    await this.tokenDatabase.create(newToken)

    return token
  }

  public async getTokenByUserId(userId: string): Promise<Token> {
    const token = await this.tokenDatabase.getTokenByUserId(userId);
    if (!token) {
      throw new NotFoundError("Token para esse usuário não foi encontrado")
    }

    return token
  }
}

