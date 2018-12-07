import { Component, h } from 'preact';

import { UserData } from '../../services/auth';

import style from './logged-user-data.component.css';

export interface Props {
  userData: UserData | null;
  onLogOut(): void;
  onClose(): void;
}

/**
 * User Link button
 */
export class LoggedUserData extends Component<Props, {}> {
  private _ref!: HTMLElement;

  constructor(props: Props) {
    super(props);

    this.bindContainerRef = this.bindContainerRef.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
  }

  public bindContainerRef(ref: Element | null) {
    if (ref) {
      this._ref = ref as HTMLElement;
    }
  }

  public onDocumentClick(e: MouseEvent) {
    if (this._ref && !this._ref.contains(e.target as HTMLElement)) {
      e.preventDefault();
      this.props.onClose();
    }
  }

  public onDocumentKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  }

  public componentDidMount() {
    document.addEventListener('click', this.onDocumentClick);
    document.addEventListener('keydown', this.onDocumentKeyDown);
  }

  public componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
    document.removeEventListener('keydown', this.onDocumentKeyDown);
  }

  public render() {
    return (
      <section
        className={style['logged-user-data']}
        ref={this.bindContainerRef}
      >
        <header>
          {this.props.userData.name} {`<${this.props.userData.email}>`}{' '}
        </header>
        <div style="margin-top: 0.5em; text-align: right;">
          <a className={'btn btn-primary'}>Profile</a>
          <button
            style="margin-left: 1em;"
            type="button"
            className={'btn btn-secondary'}
            onClick={this.props.onLogOut}
          >
            Log out
          </button>
        </div>
      </section>
    );
  }
}
