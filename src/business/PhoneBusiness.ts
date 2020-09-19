import { PhoneDatabase } from "../data/PhoneDatabase";
import { IdManager } from "../services/IdManager";
import { Phone } from "../model/Phone";
import { DataAlreadyInUser } from "../errors/DataAlreadyInUser";
import { NotFoundError } from "../errors/NotFoundError";

export class PhoneBusiness {
  constructor(
    private phoneDatabase: PhoneDatabase,
    private idManager: IdManager
  ) { }

  public async insert(phones: Array<{ numero: string, ddd: string }>, userId: string, now: string): Promise<string> {
    for (let index = 0; index < phones.length; index++) {
      const id = this.idManager.generateId()

      const newPhone = new Phone(
        id,
        phones[index].numero,
        phones[index].ddd,
        now,
        now,
        userId
      )
      await this.phoneDatabase.create(newPhone)

    }
    return "ok"
  }


  public async getPhoneByUserId(userId: string): Promise<Phone[]> {
    return await this.phoneDatabase.getPhoneByUserId(userId);
  }

  public async delete(userId: string): Promise<void> {
    const phones = await this.phoneDatabase.getPhoneByUserId(userId);
    if (phones.length < 1) {
      throw new NotFoundError("Telefone não encontrado")
    }

    await this.phoneDatabase.delete(userId)
  }

}
