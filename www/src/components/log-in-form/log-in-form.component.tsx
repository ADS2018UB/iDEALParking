import { Component, h } from 'preact';
import linkstate from 'linkstate';
import Portal from 'preact-portal';

import style from './log-in-form.css';

export interface LogInData {
  email: string;
  password: string;
}

export interface Props {
  onSubmit(value: LogInData): void;
  onCancel(): void;
  errors: string[] | null;
}

export interface State extends LogInData {}

/**
 * Bootstrap form
 */
export class LogInForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  public onSubmit(e: Event) {
    e.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state);
    }
  }

  public onCancel(e: Event) {
    e.preventDefault();
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  public render({ errors }: Props, { email, password }: State) {
    return (
      <Portal into={'body'}>
        <div className={style['form-signin__wrapper']}>
          <form className={style['form-signin']} onSubmit={this.onSubmit}>
            <h1 className={'h3 mb-3 font-weight-normal'}>Please sign in</h1>
            {errors &&
              errors.length &&
              errors.map(error => (
                <div class="alert alert-danger" role="alert">
                  {error}
                </div>
              ))}
            <label for="loginInputEmail" className={'sr-only'}>
              Email address
            </label>
            <input
              type="email"
              id="loginInputEmail"
              className={'form-control'}
              value={email}
              // @ts-ignore
              onInput={linkstate(this, 'email')}
              placeholder="Email address"
              required
              autofocus
            />
            <label for="loginInputPassword" className={'sr-only'}>
              Password
            </label>
            <input
              type="password"
              id="loginInputPassword"
              className={'form-control'}
              value={password}
              // @ts-ignore
              onInput={linkstate(this, 'password')}
              placeholder="Password"
              required
            />
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
              Sign in
            </button>
          </form>
        </div>
      </Portal>
    );
  }
}
