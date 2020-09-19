import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'SKY_User'

  private toModel(dbModel?: any): User | undefined {
    return (
      dbModel &&
      new User(
        dbModel.id,
        dbModel.nome,
        dbModel.email,
        dbModel.password,
        dbModel.data_criacao,
        dbModel.data_atualizacao,
        dbModel.ultimo_login
      )
    )
  }

  public async register(user: User): Promise<void> {
    await this.getConnection()
      .insert({
        id: user.getId(),
        nome: user.getNome(),
        email: user.getEmail(),
        password: user.getHash(),
        data_criacao: user.getCreatedAt(),
        data_atualizacao: user.getUpdatedAt(),
        ultimo_login: user.getLastLogin()

      })
      .into(UserDatabase.TABLE_NAME)
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await super.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email })

    return this.toModel(result[0])
  }

  public async getUserById(id: string): Promise<User | undefined> {
    const result = await super.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id })

    return this.toModel(result[0])
  }

  public async updateLastLoginUserById(id: string, date: string): Promise<void> {
    await super.getConnection()
      .update({ultimo_login: date})
      .from(UserDatabase.TABLE_NAME)
      .where({ id })
  }

  public async delete(id: string): Promise<void> {
    await super.getConnection()
      .delete()
      .from(UserDatabase.TABLE_NAME)
      .where({ id })
  }
}