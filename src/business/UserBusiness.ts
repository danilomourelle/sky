import { UserDatabase } from "../data/UserDatabase";
import { IdManager } from "../services/IdManager";
import { User } from "../model/User";
import { HashManager } from "../services/HashManager";
import { DataAlreadyInUser } from "../errors/DataAlreadyInUser";
import { TokenManager } from "../services/TokenManager";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import moment from "moment"

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idManager: IdManager,
    private hashManager: HashManager,
    private tokenManager: TokenManager
  ) { }

  public async insert(nome: string, email: string, password: string): Promise<{ id: string, now: string }> {
    const user = await this.userDatabase.getUserByEmail(email)
    if (user) {
      throw new DataAlreadyInUser("Email já existente")
    }

    const id = this.idManager.generateId()
    const hash = await this.hashManager.generateHash(password);

    const now = moment().utcOffset(-180).format()

    const newUser = new User(id, nome, email, hash, now, now, now)

    await this.userDatabase.register(newUser)

    return { id, now }
  }

  public async signIn(email: string, password: string): Promise<User> {
    const user = await this.userDatabase.getUserByEmail(email);

    if (!user) {
      throw new NotFoundError("Usuário e/ou senha inválidos")
    }

    const isPasswordValid = await this.hashManager.compareHash(password, user.getHash())
    if (!isPasswordValid) {
      throw new UnauthorizedError("Usuário e/ou senha inválidos")
    }

    const now = moment().utcOffset(-180).format()
    
    await this.userDatabase.updateLastLoginUserById(user.getId(), now)
    user.setLastLogin(now)

    return user
  }

  public async getUserById(id: string): Promise<User | undefined> {
  
    const user = await this.userDatabase.getUserById(id);

    return user
  }

  public async delete(id: string): Promise<void> {
    const user = await this.userDatabase.getUserById(id);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado")
    }

    await this.userDatabase.delete(id)
  }
}