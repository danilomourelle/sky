import { v4 } from 'uuid'

export class IdManager {
  public generateId(): string {
    return v4()
  }
}