import { h, Component } from 'preact';

import style from './style.css';

export interface State {
  isOpen: boolean;
}

export class ParkingForm extends Component<{}, State> {
  private _form!: HTMLFormElement;

  constructor(props: {}) {
    super(props);

    this.state = {
      isOpen: false,
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
  }

  public resetForm() {
    if (this._form) {
      this._form.reset();
    }
  }

  public render() {
    return (
      <div>
        <button type="button" class="btn" onClick={this.toggleVisibility}>
          Click Me
        </button>
        {this.state.isOpen && (
          <form className={style.parking_form} ref={this.bindForm}>
            <div class="contain">
              <h2>Add more details</h2>
              <p class="textp">
                Please fill in this form to add more <br /> details to your
                request.
              </p>
              <label for="size">
                <b>Size</b>
                <br />
                <br />
                <select value={this.state.value}>
                    <option value="one">1</option>
                    <option value="two">2</option>
                    <option value="three">3</option>
                </select>
                <input
                  id="insize"
                  className={style.insize}
                  type="number"
                  placeholder="Enter Size"
                  name="size"
                />
              </label>
              <br />
              <br />
              <br />
              <fieldset class="inputGroup">
                <legend>Choose some extras</legend>
                <br />
                <label className={style.container}>
                  {' '}
                  Lift
                  <input type="checkbox" />
                  <span className={style.checkmark} />
                </label>
                <br />
                <label className={style.container}>
                  {' '}
                  Deposit needed
                  <input type="checkbox" />
                  <span className={style.checkmark} />
                </label>
                <br />
                <label className={style.container}>
                  {' '}
                  Renovated
                  <input type="checkbox" />
                  <span className={style.checkmark} />
                </label>
                <br />
                <div className={style.clearfix}>
                  <button
                    type="reset"
                    onClick={this.resetForm}
                    class="cancelbtn btn"
                  >
                    {' '}
                    Cancel{' '}
                  </button>
                  <button type="submit" class="signupbtn btn">
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
