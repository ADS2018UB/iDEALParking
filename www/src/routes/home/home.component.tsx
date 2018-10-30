import { Component, h } from 'preact';
import { RoutableProps } from 'preact-router';
import Map from 'pigeon-maps';

import style from './style.css';

const position: [number, number] = [41.387385, 2.164665];

export interface Props extends RoutableProps {}
export interface State {
  width: number;
  height: number;
}

export class Home extends Component<Props, State> {
  private _wrapper!: HTMLElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      width: 600,
      height: 400,
    };

    this.bindContainer = this.bindContainer.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  public onResize() {
    if (this._wrapper) {
      const { width, height } = this._wrapper.getBoundingClientRect();
      this.setState({ width, height });
    }
  }

  public bindContainer(ref: Element | undefined) {
    if (ref) {
      this._wrapper = ref as HTMLElement;
    }
  }

  public render() {
    return (
      <div class={style.home} ref={this.bindContainer}>
        <Map
          center={position}
          zoom={16}
          width={this.state.width}
          height={this.state.height}
        />
      </div>
    );
  }

  public componentDidMount() {
    if (window) {
      window.addEventListener('resize', this.onResize);
    }
    this.onResize();
  }

  public componentWillUnmount() {
    if (window) {
      window.removeEventListener('resize', this.onResize);
    }
  }
}
