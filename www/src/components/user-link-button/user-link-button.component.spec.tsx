/**
 * Jest Spec
 */
import { h } from 'preact';
import { shallow, RenderContext } from 'preact-render-spy';

import { UserLinkButton } from './user-link-button.component';

describe('UserLinkButton', () => {
  let component: UserLinkButton;
  let ctx: RenderContext<{}, {}>;
  let props: {};

  beforeEach(() => {
    props = {};

    ctx = shallow(<UserLinkButton {...props} />);
    component = ctx.component();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
