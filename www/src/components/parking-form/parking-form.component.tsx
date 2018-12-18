import { h, Component } from 'preact';
import linkstate from 'linkstate';

import style from './style.css';

export interface State {
  isOpen: boolean;
}

export interface FormsData {
  size: number;
  lift: boolean;
  deposit: boolean;
  renovated: boolean;
  autdoor: boolean;
  alarm: boolean;
  cam: boolean;
  sec_pers: boolean;
}

export interface Props {
  onSubmit(value: FormsData): void;
}

export interface State extends FormsData {}

export class ParkingForm extends Component<Props, State> {
  private _form!: HTMLFormElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
      size: 1,
      lift: false,
      deposit: false,
      renovated: false,
      autdoor: false,
      alarm: false,
      cam: false,
      sec_pers: false,
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.bindForm = this.bindForm.bind(this);
  }

  public bindForm(ref: Element | null) {
    if (ref) {
      this._form = ref as HTMLFormElement;
    }
  }

  public toggleVisibility() {
    this.setState({ isOpen: !this.state.isOpen });
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
  }

  public render(_, { size, lift, deposit, renovated, autdoor, alarm, cam, sec_pers }: State) {
    return (
      <div>
        <button type="button" class="btn" onClick={this.toggleVisibility}>
          Click Me
        </button>
        {this.state.isOpen && (
          <form className={style.parking_form} ref={this.bindForm} onSubmit={this.onSubmit}>
            <div class="contain">
              <br/>
              <h2>Add more details</h2>
              <p class="textp">
                Please fill in this form to add more <br /> details to your
                request.
              </p>
              <label for="size" type="size">
                <b>Size</b>
                <br />
                <select
                  //value={this.state.size}
                  className={['custom-select', 'd-block', 'w-100'].join(' ')}
                  onChange={linkstate(this, String(this.state.size))}
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
                <label className={'custom-radio'}>
                  {' '}
                  <input type="checkbox" onChange={linkstate(this, String(this.state.lift))}/>
                  <span className={style.checkmark} />
                  Lift
                </label>
                <br />
                <label className={'custom-radio'}>
                  {' '}
                  <input type="checkbox" onChange={linkstate(this, String(this.state.deposit))}/>
                  <span className={style.checkmark} />
                  Deposit needed
                </label>
                <br />
                <label className={'custom-radio'}>
                  {' '}
                   <input type="checkbox" onChange={linkstate(this, String(this.state.renovated))}/>
                  <span className={style.checkmark} />
                  Renovated
                </label>
                <br />
                <label className={'custom-radio'}>
                  {' '}
                   <input type="checkbox" onChange={linkstate(this, String(this.state.autdoor))}/>
                  <span className={style.checkmark} />
                  Automatic doors
                </label>
                <br />
                <label className={'custom-radio'}>
                  {' '}
                   <input type="checkbox" onChange={linkstate(this, String(this.state.alarm))}/>
                  <span className={style.checkmark} />
                  Security Alarm
                </label>
                <br />
                <label className={'custom-radio'}>
                  {' '}
                   <input type="checkbox"  onChange={linkstate(this, String(this.state.cam))}/>
                  <span className={style.checkmark} />
                  Security cams
                </label>
                <br />
                <label className={'custom-radio'}>
                  {' '}
                   <input type="checkbox"  onChange={linkstate(this, String(this.state.sec_pers))}/>
                  <span className={style.checkmark} />
                  Security personal
                </label>
                <br />
                <div className={style.clearfix}>
                  <button
                    type="reset"
                    onClick={this.resetForm}
                    class="cancelbtn btn btn-secondary"
                  >
                    {' '}
                    Cancel{' '}
                  </button>
                  <button type="submit" class="btn btn-primary">
                    {' '}
                    Search{' '}
                  </button>
                </div>
              </fieldset>
            </div>
          </form>
        )}
      </div>
    );
  }
}
