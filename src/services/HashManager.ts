import * as bcrypt from "bcryptjs"

export class HashManager {
  public async generateHash(password: string): Promise<string> {
    const cost = Number(process.env.BCRYPT_COST)
    const salt = await bcrypt.genSalt(cost)
    const hash = await bcrypt.hash(password, salt)

    return hash
  }

  public async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}