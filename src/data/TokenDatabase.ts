import { BaseDatabase } from "./BaseDatabase";
import { Token } from "../model/Token";

export class TokenDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'SKY_Token'

  private toModel(dbModel?: any): Token | undefined {
    return (
      dbModel &&
      new Token(
        dbModel.id,
        dbModel.token,
        dbModel.data_criacao,
        dbModel.data_atualizacao,
        dbModel.user_id
      )
    )
  }

  public async create(token: Token): Promise<void> {
    await this.getConnection()
      .insert({
        id: token.getId(),
        tokeN: token.getToken(),
        data_criacao: token.getUpdateAt(),
        data_atualizacao: token.getUpdateAt(),
        user_id: token.getUserId()
      })
      .into(TokenDatabase.TABLE_NAME)
  }

  public async getTokenByUserId(id: string): Promise<Token | undefined> {
    const result = await super.getConnection()
      .select("*")
      .from(TokenDatabase.TABLE_NAME)
      .where({ user_id: id })

    return this.toModel(result[0])
  }
}