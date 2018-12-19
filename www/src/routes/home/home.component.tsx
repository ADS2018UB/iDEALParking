import { Component, h } from 'preact';
import { RoutableProps } from 'preact-router';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { switchMap } from 'rxjs/operators';

import style from './style.css';
import { PanelPortal } from '../../components/panel-portal';
import { DistrictBanner } from '../../components/district-banner';
import {
  GetQuoteOkResponse,
  GetQuote,
} from '../../services/api/api.interfaces';
import { ParkingQuoteBanner } from '../../components/parking-quote-banner';
import { ParkingForm, FormsData } from '../../components/parking-form';
import { getQuote } from '../../services/api/api.service';
import { UserLinkButton } from '../../components/user-link-button';
import { authService } from '../../services/auth';

export type Coordinate = [number, number];

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
  isLogged: boolean;
  lastFormValue: null | FormsData;
}

const features$ = new BehaviorSubject<FormsData>({
  size: 3,
  hasLift: false,
  hasDeposit: false,
  isRenovated: false,
  hasAutdoor: false,
  hasAlarm: false,
  hasCam: false,
  hasSecPers: false,
});

const initialPosition: Coordinate = [41.387385, 2.164665];
const position$ = new Subject<Coordinate>();

const selectedPoint$: Observable<SelectedPoint | null> = combineLatest(
  position$,
  features$,
).pipe(
  switchMap(({ 0: latLng, 1: features }) => {
    return getQuote(latLng, {
      parkingType: features.size,
      hasLift: features.hasLift,
      hasPlan: features.hasDeposit,
      autDoor: features.hasAutdoor,
      alarm: features.hasAlarm,
      secCam: features.hasCam,
      secPers: features.hasSecPers,
    }).then((quote: GetQuote) => {
      if (quote.errors) {
        alert(quote.errors);
        return null;
      }
      return {
        position: latLng,
        payload: quote as GetQuoteOkResponse,
      };
    });
  }),
);

export class Home extends Component<Props, State> {
  private _wrapper!: HTMLElement;
  private _userDataSubs!: Subscription;
  private _selectedPointSubs!: Subscription;

  constructor(props: Props) {
    super(props);

    this.state = {
      position: initialPosition,
      width: 600,
      height: 400,
      sidePanelOpen: false,
      selectedPoint: null,
      isLogged: false,
      lastFormValue: null,
    };

    this.bindContainer = this.bindContainer.bind(this);
    this.onFeatureChange = this.onFeatureChange.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onPanelClose = this.onPanelClose.bind(this);
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
      <div className={style.home} ref={this.bindContainer}>
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
        <UserLinkButton />
        {this.state.sidePanelOpen && this.state.selectedPoint && (
          <PanelPortal>
            <button
              type="button"
              onClick={this.onPanelClose}
              className={style['panel-portal__close-btn']}
            >
              {' '}
              <i class="fas fa-times fa-2x" />{' '}
            </button>
            <div className={style['panel-portal__content-wrapper']}>
              <DistrictBanner
                {...this.state.selectedPoint.payload.result.district}
              />
              <ParkingQuoteBanner {...this.state.selectedPoint.payload} />
              {this.state.isLogged && (
                <section style="padding: 0 1em;">
                  <header style="font-weight: 600;">
                    Set your preference to get a better quote
                  </header>
                  <ParkingForm
                    initialValue={this.state.lastFormValue || {}}
                    onSubmit={this.onFeatureChange}
                  />
                </section>
              )}
              {!this.state.isLogged && (
                <section style="padding: 0 1em;">
                  <header style="font-weight: 600;">
                    Sign up to add features and get a better quote!
                  </header>
                </section>
              )}
            </div>
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

    this._userDataSubs = authService.userData$.subscribe(userData =>
      this.setState({ isLogged: !!userData }),
    );

    this._selectedPointSubs = selectedPoint$.subscribe(selectedPoint =>
      this.setState({ selectedPoint }),
    );
  }

  public componentWillUnmount() {
    if (window) {
      window.removeEventListener('resize', this.onResize);
    }

    if (this._userDataSubs) {
      this._userDataSubs.unsubscribe();
    }

    if (this._selectedPointSubs) {
      this._selectedPointSubs.unsubscribe();
    }
  }

  public onMapClick({ latLng }) {
    if (latLng) {
      position$.next(latLng);
    }

    this.setState({ sidePanelOpen: true });
  }

  public onPanelClose() {
    this.setState({ sidePanelOpen: false });
  }

  public onFeatureChange(lastFormValue: FormsData) {
    features$.next(lastFormValue);
    this.setState({ lastFormValue });
  }
}
