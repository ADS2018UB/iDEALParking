/**
 * Jest Spec
 */
import { h } from 'preact';
import { shallow, RenderContext } from 'preact-render-spy';

import { Home, Props, State } from './home.component';

describe('Home', () => {
  let component: Home;
  let ctx: RenderContext<Props, State>;
  let props: Props;

  beforeEach(() => {
    props = {};

    ctx = shallow(<Home {...props} />);
    component = ctx.component();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
