export class LoginForm {

  public isSign?: boolean;
  public login?: string;
  public password?: string;
  public passwordConfirm?: string;

  constructor(loginForm: LoginForm) {
    Object.assign(this, loginForm);
  }
}