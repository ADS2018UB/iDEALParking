/**
 * Jest Spec
 */
import { h } from 'preact';
import { shallow, RenderContext } from 'preact-render-spy';

import { LoggedUserData, Props } from './logged-user-data.component';

describe('LoggedUserData', () => {
  let component: LoggedUserData;
  let ctx: RenderContext<Props, {}>;
  let props: Props;

  beforeEach(() => {
    props = {
      userData: {
        id: 'ID',
        name: 'NAME',
        email: 'EMAIL',
      },
      onLogOut: jest.fn(),
      onClose: jest.fn(),
    };

    ctx = shallow(<LoggedUserData {...props} />);
    component = ctx.component();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
