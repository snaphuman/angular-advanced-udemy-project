
export class User {
  constructor(
    public nombre: string,
    public email: string,
    public password?: boolean,
    public google?: boolean,
    public img?: string,
    public role?: string,
    public uid?: string,
  ) {}
}
