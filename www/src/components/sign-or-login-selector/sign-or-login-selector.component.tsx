import { Component, h } from 'preact';
import objstr from 'obj-str';

import style from './sign-or-login-selector.component.css';

export enum ActiveOption {
  LOGIN,
  SING_UP,
}

export interface Props {
  value: ActiveOption;
  onSelectChange(newVal: ActiveOption): void;
}

export class SingOrLoginSelector extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.selectLogin = this.selectLogin.bind(this);
    this.selectSignUp = this.selectSignUp.bind(this);
  }

  public selectLogin(e: Event) {
    e.preventDefault();
    this.props.onSelectChange(ActiveOption.LOGIN);
  }

  public selectSignUp(e: Event) {
    e.preventDefault();
    this.props.onSelectChange(ActiveOption.SING_UP);
  }

  public render() {
    return (
      <div className={style['sign-log-selector']} role="listbox">
        <button
          className={objstr({
            [style['sign-log-selector__button']]: true,
            [style['sign-log-selector__button--active']]:
              this.props.value === ActiveOption.LOGIN,
          })}
          type="button"
          onClick={this.selectLogin}
        >
          Log In
        </button>
        <button
          className={objstr({
            [style['sign-log-selector__button']]: true,
            [style['sign-log-selector__button--active']]:
              this.props.value === ActiveOption.SING_UP,
          })}
          type="button"
          onClick={this.selectSignUp}
        >
          Sign In
        </button>
      </div>
    );
  }
}
