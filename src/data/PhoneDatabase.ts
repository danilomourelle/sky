import { BaseDatabase } from "./BaseDatabase";
import { Phone } from "../model/Phone";

export class PhoneDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'SKY_PhoneNumber'

  private toModel(dbModel?: any): Phone | undefined {
    return (
      dbModel &&
      new Phone(
        dbModel.id,
        dbModel.phone_number,
        dbModel.phone_ddd,
        dbModel.data_criacao,
        dbModel.data_atualizacao,
        dbModel.user_id
      )
    )
  }

  public async create(phone: Phone): Promise<void> {
    await this.getConnection()
      .insert({
        id: phone.getId(),
        phone_number: phone.getPhoneNumber(),
        phone_ddd: phone.getPhonePrefix(),
        data_criacao: phone.getCreatedAt(),
        data_atualizacao: phone.getUpdateAt(),
        user_id: phone.getUserId()
      })
      .into(PhoneDatabase.TABLE_NAME)
  }

  public async update(newDate: number, phoneId: string): Promise<void> {
    await this.getConnection()
      .update({
        update_at: newDate
      })
      .into(PhoneDatabase.TABLE_NAME)
      .where({ id: phoneId })
  }

  public async getPhoneByValue(phone: Phone): Promise<Phone | undefined> {
    const result = await super.getConnection()
      .select("*")
      .from(PhoneDatabase.TABLE_NAME)
      .where({ phone_number: phone.getPhoneNumber() })

    return this.toModel(result[0])
  }

  public async getPhoneByUserId(id: string): Promise<Phone[]> {
    const result = await super.getConnection()
      .select("*")
      .from(PhoneDatabase.TABLE_NAME)
      .where({ user_id: id })

    return  result.map((phone: any) => {
      return this.toModel(phone) as Phone
    }) 
  }

  public async delete(userId: string): Promise<void> {
    await super.getConnection()
      .delete()
      .from(PhoneDatabase.TABLE_NAME)
      .where({ user_id: userId })
  }
}