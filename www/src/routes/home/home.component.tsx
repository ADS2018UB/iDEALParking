import { Component, h } from 'preact';
import { RoutableProps } from 'preact-router';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';

import style from './style.css';
import { PanelPortal } from '../../components/panel-portal';
import { DistrictBanner } from '../../components/district-banner';
import { GetQuoteOkResponse, GetQuote } from '../../api/api.interfaces';
import { ParkingQuoteBanner } from '../../components/parking-quote-banner';
import { ParkingForm } from '../../components/parking-form';
import { getQuote } from '../../api/api.service';

declare var BASE_API_PATH: string;

const position: [number, number] = [41.387385, 2.164665];

export interface SelectedPoint {
  position: [number, number];
  payload: GetQuoteOkResponse;
}

export interface Props extends RoutableProps {}

export interface State {
  position: [number, number];
  width: number;
  height: number;
  sidePanelOpen: boolean;
  selectedPoint: null | SelectedPoint;
}

export class Home extends Component<Props, State> {
  private _wrapper!: HTMLElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      position,
      width: 600,
      height: 400,
      sidePanelOpen: false,
      selectedPoint: null,
    };

    this.bindContainer = this.bindContainer.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onPanelClose = this.onPanelClose.bind(this);
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
          center={this.state.position}
          zoom={16}
          width={this.state.width}
          height={this.state.height}
          onClick={this.onMapClick}
        >
          {this.state.selectedPoint && (
            <Marker anchor={this.state.selectedPoint.position} payload={0} />
          )}
        </Map>
        {this.state.sidePanelOpen && this.state.selectedPoint && (
          <PanelPortal>
            <button type="button" onClick={this.onPanelClose}>
              close
            </button>
            <DistrictBanner
              {...this.state.selectedPoint.payload.result.district}
            />
            <ParkingQuoteBanner {...this.state.selectedPoint.payload} />
            <section style="padding: 0 1em;">
              <header style="font-weight: 600;">
                Set your preference to get a better quote
              </header>
              <ParkingForm />
            </section>
          </PanelPortal>
        )}
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

  public onMapClick({ event, latLng, pixel }) {
    if (latLng) {
      getQuote(latLng).then((quote: GetQuote) => {
        if (quote.errors) {
          alert(quote.errors);
        } else {
          this.setState({
            selectedPoint: {
              position: latLng,
              payload: quote as GetQuoteOkResponse,
            },
          });
        }
      });
    }

    this.setState({ sidePanelOpen: true });
  }

  public onPanelClose() {
    this.setState({ sidePanelOpen: false });
  }
}
