import { Component, h } from 'preact';
import { GetQuoteOkResponse } from '../../api/api.interfaces';

import style from './parking-quote-banner.css';

export class ParkingQuoteBanner extends Component<GetQuoteOkResponse, {}> {
  public render() {
    return (
      <div className={style.parking_quote_banner}>
        Your price: <strong>{this.props.result.price}</strong>
      </div>
    );
  }
}
