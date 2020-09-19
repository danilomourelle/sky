export class Phone {
  constructor(
    private id: string,
    private phoneNumber: string,
    private phonePrefix: string,
    private createdAt: string,
    private updateAt: string,
    private userId: string
  ) { }

  public getId(): string {
    return this.id
  }

  public getPhoneNumber(): string {
    return this.phoneNumber
  }

  public getPhonePrefix(): string {
    return this.phonePrefix
  }

  public getCreatedAt(): string {
    return this.createdAt
  }

  public getUpdateAt(): string {
    return this.updateAt
  }

  public getUserId(): string {
    return this.userId
  }


}