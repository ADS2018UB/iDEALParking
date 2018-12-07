import { Component, h } from 'preact';

import style from './user-link-button.component.css';
import { authService, UserData } from '../../services/auth';
import { LogInForm, LogInData } from '../log-in-form';
import { LoggedUserModalData } from '../logged-user-modal-data/logged-user-modal-data.component';

export interface State {
  userData: UserData | null;
  openLoginForm: boolean;
  loginErrors: string[] | null;
}

/**
 * User Link button
 */
export class UserLinkButton extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      userData: null,
      openLoginForm: false,
      loginErrors: null,
    };

    this.openLogInForm = this.openLogInForm.bind(this);
    this.onLogIn = this.onLogIn.bind(this);
    this.onLogInCancel = this.onLogInCancel.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
  }

  public componentWillMount() {
    this._checkData();
  }

  public openLogInForm(e: Event) {
    e.preventDefault();
    this.setState({ openLoginForm: true });
  }

  public onLogInCancel() {
    this.setState({ openLoginForm: false });
  }

  public onLogOut() {
    authService.logOut();
    this.setState({ userData: null });
  }

  public onLogIn(logInData: LogInData) {
    authService
      .authenticate(logInData.email, logInData.password)
      .then(result => {
        if (result.errors) {
          this.setState({ loginErrors: result.errors });
        } else {
          this._checkData();
          this.setState({ loginErrors: null, openLoginForm: false });
        }
      });
  }

  public render() {
    return (
      <div className={style['user-link-button']}>
        {this.state.userData && (
          <LoggedUserModalData
            userData={this.state.userData}
            onLogOut={this.onLogOut}
          />
        )}

        {!this.state.userData && (
          <button
            type="button"
            className={'btn btn-primary'}
            onClick={this.openLogInForm}
          >
            Log / Sign In
          </button>
        )}

        {this.state.openLoginForm && (
          <LogInForm
            onSubmit={this.onLogIn}
            onCancel={this.onLogInCancel}
            errors={this.state.loginErrors}
          />
        )}
      </div>
    );
  }

  private _checkData() {
    authService.getUserData().then(result => {
      console.log(result);
      if (result && result.id) {
        this.setState({ userData: result });
      }
    });
  }
}
