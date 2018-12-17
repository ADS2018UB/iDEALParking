import { Component, h } from 'preact';
import linkstate from 'linkstate';
import Portal from 'preact-portal';
import objstr from 'obj-str';

import style from './log-in-form.css';
import { SingOrLoginSelector, ActiveOption } from '../sign-or-login-selector';
import { CreateUserParams } from '../../services/auth/auth.service';

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

export interface LogInData {
  email: string;
  password: string;
}

export interface Props {
  onLogin(value: LogInData): void;
  onSignUp(value: CreateUserParams): void;
  onCancel(): void;
  errors: string[] | null;
}

export interface State extends LogInData {
  name: string;
  validationErrors: string[];
  signupMail: string;
  signupPassword: string;
  confirmPassword: string;
  selectedOption: ActiveOption;
}

/**
 * Bootstrap form
 */
export class LogInForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
      validationErrors: [],
      signupMail: '',
      signupPassword: '',
      confirmPassword: '',
      selectedOption: ActiveOption.LOGIN,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChangeSelected = this.onChangeSelected.bind(this);
  }

  public onSubmit(e: Event) {
    e.preventDefault();
    let validationErrors = [];
    if (this.state.selectedOption === ActiveOption.LOGIN) {
      if (!this.state.password) {
        validationErrors.push(['Password is required']);
      }

      if (!EMAIL_REGEXP.test(this.state.email)) {
        validationErrors.push(['Invalid e-mail']);
      }

      if (!validationErrors.length) {
        this.props.onLogin({
          email: this.state.email,
          password: this.state.password,
        });
      }
    } else {
      if (!this.state.signupPassword) {
        validationErrors.push(['Password is required']);
      }

      if (this.state.signupPassword !== this.state.confirmPassword) {
        validationErrors.push(['Password do not match']);
      }

      if (!EMAIL_REGEXP.test(this.state.signupMail)) {
        validationErrors.push(['Invalid e-mail']);
      }

      if (!validationErrors.length) {
        this.props.onSignUp({
          email: this.state.signupMail,
          name: this.state.name,
          password: this.state.signupPassword,
        });
      }
    }

    this.setState({ validationErrors });
  }

  public onChangeSelected(selectedOption: ActiveOption) {
    this.setState({ selectedOption, validationErrors: [] });
  }

  public onCancel(e: Event) {
    e.preventDefault();
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  public render(
    { errors }: Props,
    {
      email,
      password,
      name,
      confirmPassword,
      signupMail,
      signupPassword,
    }: State,
  ) {
    return (
      <Portal into={'body'}>
        <div className={style['form-signin__wrapper']}>
          <form className={style['form-signin']} onSubmit={this.onSubmit}>
            <h1 style="text-align: center;">iDeal Parking</h1>
            <div style="text-align: center; margin-bottom: 1em;">
              <SingOrLoginSelector
                value={this.state.selectedOption}
                onSelectChange={this.onChangeSelected}
              />
            </div>

            {errors &&
              errors.length &&
              errors.map(error => (
                <div class="alert alert-danger" role="alert">
                  {error}
                </div>
              ))}

            {this.state.validationErrors.map(error => (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            ))}

            <div style="display: flex; flex-wrap: nowrap; overflow-x: hidden;">
              <div
                className={objstr({
                  [style['form-signin__controls-wrapper']]: true,
                  [style['form-signin__controls-wrapper--active']]:
                    this.state.selectedOption === ActiveOption.SING_UP,
                })}
              >
                <input
                  type="string"
                  id="loginInputEmail"
                  className={objstr({
                    'form-control': true,
                    [style['form-signin__control--top']]: true,
                  })}
                  value={email}
                  // @ts-ignore
                  onInput={linkstate(this, 'email')}
                  aria-label="Email Address"
                  placeholder="Email address"
                  autofocus
                />
                <input
                  type="password"
                  id="loginInputPassword"
                  aria-label="password"
                  className={objstr({
                    'form-control': true,
                    [style['form-signin__control--bottom']]: true,
                  })}
                  value={password}
                  // @ts-ignore
                  onInput={linkstate(this, 'password')}
                  placeholder="Password"
                />
              </div>
              <div
                className={objstr({
                  [style['form-signin__controls-wrapper']]: true,
                  [style['form-signin__controls-wrapper--active']]:
                    this.state.selectedOption === ActiveOption.SING_UP,
                })}
              >
                <input
                  autocomplete="off"
                  type="name"
                  className={objstr({
                    'form-control': true,
                    [style['form-signin__control--top']]: true,
                  })}
                  value={name}
                  // @ts-ignore
                  onInput={linkstate(this, 'name')}
                  aria-label="Name"
                  placeholder="Name"
                />
                <input
                  autocomplete="off"
                  type="string"
                  className={objstr({
                    'form-control': true,
                    [style['form-signin__control--middle']]: true,
                  })}
                  value={signupMail}
                  // @ts-ignore
                  onInput={linkstate(this, 'signupMail')}
                  aria-label="Email Address"
                  placeholder="Email address"
                />
                <input
                  autocomplete="off"
                  type="password"
                  aria-label="password"
                  className={objstr({
                    'form-control': true,
                    [style['form-signin__control--middle']]: true,
                  })}
                  value={signupPassword}
                  // @ts-ignore
                  onInput={linkstate(this, 'signupPassword')}
                  placeholder="Password"
                />
                <input
                  autocomplete="off"
                  type="password"
                  aria-label="password"
                  className={objstr({
                    'form-control': true,
                    [style['form-signin__control--bottom']]: true,
                  })}
                  value={confirmPassword}
                  // @ts-ignore
                  onInput={linkstate(this, 'confirmPassword')}
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <button
              className={'btn btn-lg btn-secondary btn-block'}
              type="button"
              onClick={this.onCancel}
            >
              Cancel
            </button>
            <button
              className={'btn btn-lg btn-primary btn-block'}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </Portal>
    );
  }
}
