/**
 * Jest Spec
 */
import { h } from 'preact';
import { shallow, RenderContext } from 'preact-render-spy';

import { LoggedUserModalData, Props } from './logged-user-modal-data.component';

describe('LoggedUserModalData', () => {
  let component: LoggedUserModalData;
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
    };

    ctx = shallow(<LoggedUserModalData {...props} />);
    component = ctx.component();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
