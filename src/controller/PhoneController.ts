import { NextFunction, Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { PhoneDatabase } from "../data/PhoneDatabase";
import { PhoneBusiness } from "../business/PhoneBusiness";
import { IdManager } from "../services/IdManager";
import { UserController } from "../controller/UserController";
import { UserBusiness } from "../business/UserBusiness";

import { InvalidParameterError } from "../errors/InvalidParameterError";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { TokenManager } from "../services/TokenManager";
import { User } from "../model/User";


export class PhoneController {

  private static PhoneBusiness = new PhoneBusiness(
    new PhoneDatabase(),
    new IdManager()
  )

  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new IdManager(),
    new HashManager(),
    new TokenManager()
  )

  public async signUp(req: Request, res: Response, next: NextFunction) {
    const { telefones } = req.body
    const { now, userId } = res.locals
    try {

      if (!telefones || !telefones.length) {
        throw new InvalidParameterError("Preencha todos os campos")
      }

      await PhoneController.PhoneBusiness.insert(telefones, userId, now)

      return next()

    } catch (err) {
      await PhoneController.UserBusiness.delete(userId)
      res.status(err.errorCode || 400).send({ message: err.message });
      await BaseDatabase.disconnectDB()
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user as User
    try {

      const phones = await PhoneController.PhoneBusiness.getPhoneByUserId(user.getId())

      res.locals.phones = phones

      return next()

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await BaseDatabase.disconnectDB()
    }
  }

  public async check(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId
    try {
      const phones = await PhoneController.PhoneBusiness.getPhoneByUserId(userId)

      if (phones.length){
        res.locals.phones = phones
      }

      return next()

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await BaseDatabase.disconnectDB()
    }
  }
}