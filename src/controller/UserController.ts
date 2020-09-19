import { Request, Response, NextFunction } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { IdManager } from "../services/IdManager";
import { HashManager } from "../services/HashManager";
import { BaseDatabase } from "../data/BaseDatabase";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";
import { Phone } from "../model/Phone";
import { Token } from "../model/Token";
import moment from "moment";


export class UserController {

  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new IdManager(),
    new HashManager(),
  )

  public async signUp(req: Request, res: Response, next: NextFunction) {
    const { email, senha, nome } = req.body;

    try {
      if (!email || !senha || !nome) {
        throw new InvalidParameterError("Preencha todos os campos")
      }
      if (email.indexOf("@") === -1 || email[email.length - 1] === '.') {
        throw new InvalidParameterError("Email inválido")
      }

      const { id, now } = await UserController.UserBusiness.insert(nome, email, senha);

      res.locals.userId = id
      res.locals.now = now

      return next()

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await BaseDatabase.disconnectDB()
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    const { email, senha } = req.body;

    try {
      if (!email || !senha) {
        throw new InvalidParameterError("Preencha todos os campos")
      }
      if (email.indexOf("@") === -1 || email[email.length - 1] === '.') {
        throw new InvalidParameterError("Email inválido")
      }

      const user = await UserController.UserBusiness.signIn(email, senha);

      res.locals.user = user

      return next()

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await BaseDatabase.disconnectDB()
    }
  }

  public async check(req: Request, res: Response) {
    const userId = req.params.userId
    const phones = res.locals.phones as Phone[]
    const token = res.locals.token as Token
  
    try {
      
      const user = await UserController.UserBusiness.getUserById(userId)
      if (!user) {
        throw new NotFoundError("Usuário não encontrado")
      }
      
      const lastLogin = moment().utcOffset(-180).diff(moment(user.getLastLogin()), 'minutes')
      if (lastLogin > 30) {
        throw new UnauthorizedError("Sessão expirada")
      }
     
      if(!phones.length){
        throw new NotFoundError("Telefones não encontrado")
      }
      res.status(200).send({
        id: user.getId(),
        nome: user.getNome(),
        email: user.getEmail(),
        data_criacao: user.getCreatedAt(),
        data_atualizacao: user.getUpdatedAt(),
        ultimo_login: user.getLastLogin(),
        telefones: phones,
        token: token.getToken()
      })
    } catch (err) {

      res.status(err.errorCode || 400).send({ message: err.message });

    } finally {
      await BaseDatabase.disconnectDB()
    }
  }
}