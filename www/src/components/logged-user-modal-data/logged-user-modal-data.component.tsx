import { Component, h } from 'preact';

import { UserData } from '../../services/auth';

import style from './logged-user-modal-data.css';
import { LoggedUserData } from '../logged-user-data';

export interface Props {
  userData: UserData | null;
  onLogOut(): void;
}

export interface State {
  isOpen: boolean;
}

/**
 * User Link button
 */
export class LoggedUserModalData extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggleOpenState = this.toggleOpenState.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  public toggleOpenState(e: Event) {
    e.stopImmediatePropagation();
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  }

  public onClose() {
    this.setState({ isOpen: false });
  }

  public render() {
    return (
      <div className={style['logged-user-modal-data']}>
        <div style="text-align: right;">
          <button
            type="button"
            className={style['logged-user-modal-data__button']}
            onClick={this.toggleOpenState}
          >
            <i class="fas fa-user-circle" />
          </button>
        </div>

        {this.state.isOpen && (
          <LoggedUserData
            userData={this.props.userData}
            onClose={this.onClose}
            onLogOut={this.props.onLogOut}
          />
        )}
      </div>
    );
  }
}
