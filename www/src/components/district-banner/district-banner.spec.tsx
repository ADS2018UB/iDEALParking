/**
 * Jest Spec
 */
import { h } from 'preact';
import { shallow, RenderContext } from 'preact-render-spy';

import { District } from '../../api/api.interfaces';
import { DistrictBanner } from './district-banner';

describe('DistrictBanner', () => {
  let component: DistrictBanner;
  let ctx: RenderContext<District, {}>;
  let props: District;

  beforeEach(() => {
    props = {
      district_number: 6,
      name: 'Gràcia',
    };

    ctx = shallow(<DistrictBanner {...props} />);
    component = ctx.component();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
