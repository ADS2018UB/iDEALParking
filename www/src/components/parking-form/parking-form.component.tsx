import { h, Component } from 'preact';
import linkstate from 'linkstate';

import style from './style.css';

export interface FormsData {
  size: number;
  hasLift: boolean;
  hasDeposit: boolean;
  isRenovated: boolean;
  hasAutdoor: boolean;
  hasAlarm: boolean;
  hasCam: boolean;
  hasSecPers: boolean;
}

export interface State extends FormsData {}

export interface Props {
  initialValue?: Partial<FormsData>;
  onSubmit(value: FormsData): void;
}

export interface State extends FormsData {}

function defaultStateFactory(): State {
  return {
    size: 3,
    hasLift: false,
    hasDeposit: false,
    isRenovated: false,
    hasAutdoor: false,
    hasAlarm: false,
    hasCam: false,
    hasSecPers: false,
  };
}

export class ParkingForm extends Component<Props, State> {
  private _form!: HTMLFormElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      ...defaultStateFactory(),
      ...((props && props.initialValue) || {}),
    };

    this.resetForm = this.resetForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.bindForm = this.bindForm.bind(this);
  }

  public bindForm(ref: Element | null) {
    if (ref) {
      this._form = ref as HTMLFormElement;
    }
  }

  public onSubmit(e: Event) {
    e.preventDefault();
    console.log(e);
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state);
    }
  }

  public resetForm() {
    if (this._form) {
      this._form.reset();
    }
    this.setState(defaultStateFactory(), () => this.props.onSubmit(this.state));
  }

  public render() {
    return (
      <div>
        <form
          className={style.parking_form}
          ref={this.bindForm}
          onSubmit={this.onSubmit}
        >
          <div class="contain">
            <br />
            <h2>Add more details</h2>
            <p class="textp">
              Please fill in this form to add more <br /> details to your
              request.
            </p>
            <label for="size" type="size">
              <b>Size</b>
              <br />
              <select
                value={this.state.size}
                className={'custom-select d-block w-100'}
                onChange={linkstate(this, 'size')}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </label>
            <br />
            <fieldset class="inputGroup">
              <legend>Choose some extras</legend>
              <label className={style['parking-form__label']}>
                <input
                  type="checkbox"
                  className={style['parking-form__checkbox']}
                  checked={this.state.hasLift}
                  onChange={linkstate(this, 'hasLift', 'target.checked')}
                />
                Lift
              </label>
              <br />
              <label className={style['parking-form__label']}>
                <input
                  type="checkbox"
                  className={style['parking-form__checkbox']}
                  checked={this.state.hasDeposit}
                  onChange={linkstate(this, 'hasDeposit', 'target.checked')}
                />
                Deposit needed
              </label>
              <br />
              <label className={style['parking-form__label']}>
                <input
                  type="checkbox"
                  className={style['parking-form__checkbox']}
                  checked={this.state.isRenovated}
                  onChange={linkstate(this, 'isRenovated', 'target.checked')}
                />
                Renovated
              </label>
              <br />
              <label className={style['parking-form__label']}>
                <input
                  type="checkbox"
                  className={style['parking-form__checkbox']}
                  checked={this.state.hasAutdoor}
                  onChange={linkstate(this, 'hasAutdoor', 'target.checked')}
                />
                Automatic doors
              </label>
              <br />
              <label className={style['parking-form__label']}>
                <input
                  type="checkbox"
                  className={style['parking-form__checkbox']}
                  checked={this.state.hasAlarm}
                  onChange={linkstate(this, 'hasAlarm', 'target.checked')}
                />
                Security Alarm
              </label>
              <br />
              <label className={style['parking-form__label']}>
                <input
                  type="checkbox"
                  className={style['parking-form__checkbox']}
                  checked={this.state.hasCam}
                  onChange={linkstate(this, 'hasCam', 'target.checked')}
                />
                Security cams
              </label>
              <br />
              <label className={style['parking-form__label']}>
                <input
                  type="checkbox"
                  className={style['parking-form__checkbox']}
                  checked={this.state.hasSecPers}
                  onChange={linkstate(this, 'hasSecPers', 'target.checked')}
                />
                Security personal
              </label>
              <br />
              <div className={style.clearfix}>
                <button
                  type="reset"
                  onClick={this.resetForm}
                  class="cancelbtn btn btn-secondary"
                >
                  Cancel{' '}
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  style="margin-left: 0.5em;"
                >
                  Search{' '}
                </button>
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    );
  }
}
