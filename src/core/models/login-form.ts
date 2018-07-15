export class LoginForm {

  public login?: string;
  public password?: string;

  constructor(loginForm: LoginForm) {
    Object.assign(this, loginForm);
  }
}