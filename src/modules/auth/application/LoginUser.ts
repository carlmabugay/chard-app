export class LoginUser {
  constructor (private repo) {}

  async execute(email: string, password:string) {
    return this.repo.login(email, password)
  }
}