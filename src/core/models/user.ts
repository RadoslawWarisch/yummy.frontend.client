import { LoginForm } from "./login-form";

export class User extends LoginForm {
  
  constructor(user: User) {
    super({});
    Object.assign(this, user);
  }

  public image?: string;
  public phone?: number;
  public email?: string;
}
