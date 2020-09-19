import { NextFunction, Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { TokenDatabase } from "../data/TokenDatabase";
import { TokenBusiness } from "../business/TokenBusiness";
import { IdManager } from "../services/IdManager";
import { TokenManager } from "../services/TokenManager";
import { UserBusiness } from "../business/UserBusiness";
import { PhoneBusiness } from "../business/PhoneBusiness";
import { PhoneDatabase } from "../data/PhoneDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { User } from "../model/User";
import { Phone } from "../model/Phone";
import { tokenToString } from "typescript";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";

export class TokenController {

  private static TokenBusiness = new TokenBusiness(
    new TokenDatabase(),
    new IdManager(),
    new TokenManager()
  )

  private static PhoneBusiness = new PhoneBusiness(
    new PhoneDatabase(),
    new IdManager()
  )

  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new IdManager(),
    new HashManager(),
  )

  public async signUp(req: Request, res: Response) {
    const { email, nome, telefones } = req.body
    const { now, userId } = res.locals

    try {
      const token = await TokenController.TokenBusiness.insert(email, userId, now)

      res.status(201).send({
        id: userId,
        nome,
        email,
        data_criacao: now,
        data_atualizacao: now,
        ultimo_login: now,
        telefones,
        token
      })

    } catch (err) {
      await TokenController.PhoneBusiness.delete(userId)
      await TokenController.UserBusiness.delete(userId)
      res.status(err.errorCode || 400).send({ message: err.message });

    } finally {
      await BaseDatabase.disconnectDB()
    }
  }

  public async signIn(req: Request, res: Response) {
    const user = res.locals.user as User
    const phones = res.locals.phones as Phone[]
    try {

      const token = await TokenController.TokenBusiness.getTokenByUserId(user.getId())

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

  public async check(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization as string
    const userId = req.params.userId
    try {
      if (!bearerToken) {
        throw new UnauthorizedError("Operação não autorizada")
      }
      const [, token] = bearerToken.split(" ")
      const userToken = await TokenController.TokenBusiness.getTokenByUserId(userId)
      if (!userToken) {
        throw new NotFoundError("Operação não autorizada")
      }

      if (userToken.getToken() !== token) {
        throw new NotFoundError("Operação não autorizada")
      }

      res.locals.token = userToken

      return next()

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await BaseDatabase.disconnectDB()
    }
  }
}
