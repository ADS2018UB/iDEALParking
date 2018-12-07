/**
 * Jest Spec
 */
import { h } from 'preact';
import { shallow, RenderContext } from 'preact-render-spy';

import { GetQuoteOkResponse } from '../../services/api/api.interfaces';
import { ParkingQuoteBanner } from './parking-quote-banner';

describe('ParkingQuoteBanner', () => {
  let component: ParkingQuoteBanner;
  let ctx: RenderContext<GetQuoteOkResponse, {}>;
  let props: GetQuoteOkResponse;

  beforeEach(() => {
    props = {
      result: {
        district: {
          district_number: 6,
          name: 'Gràcia',
        },
        price: 22,
      },
      errors: null,
    };

    ctx = shallow(<ParkingQuoteBanner {...props} />);
    component = ctx.component();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
