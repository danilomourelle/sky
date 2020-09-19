export class Token {
  constructor(
    private id: string,
    private token: string,
    private createdAt: string,
    private updateAt: string,
    private userId: string
  ) { }

  public getId(): string {
    return this.id
  }

  public getToken(): string {
    return this.token
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