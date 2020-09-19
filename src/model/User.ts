export class User {
  constructor(
    private id: string,
    private nome: string,
    private email: string,
    private hash: string,
    private createdAt: string,
    private updatedAt: string,
    private lastLogin: string,
  ) { }

  public getId(): string {
    return this.id
  }

  public getNome(): string {
    return this.nome
  }

  public getEmail(): string {
    return this.email
  }

  public getHash(): string {
    return this.hash
  }

  public getCreatedAt(): string {
    return this.createdAt
  }

  public getLastLogin(): string {
    return this.lastLogin
  }

  public getUpdatedAt(): string {
    return this.updatedAt
  }

  public setLastLogin(date: string): void {
    this.lastLogin = date
  }
}