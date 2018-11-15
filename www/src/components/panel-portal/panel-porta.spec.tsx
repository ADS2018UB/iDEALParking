/**
 * Jest Spec
 */
import { h } from 'preact';
import { shallow, RenderContext } from 'preact-render-spy';

import { PanelPortal, Props, State } from './panel-portal';

describe('PanelPortal', () => {
  let component: PanelPortal;
  let ctx: RenderContext<Props, State>;
  let props: Props;

  beforeEach(() => {
    props = {};

    ctx = shallow(
      <PanelPortal {...props}>
        <h1>INNER</h1>
      </PanelPortal>,
    );
    component = ctx.component();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should transclude the childs', () => {
    expect(ctx.find('h1').length).toEqual(1);
  });
});
