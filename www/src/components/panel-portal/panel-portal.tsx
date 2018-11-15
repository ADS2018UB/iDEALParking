import { h, Component } from 'preact';
import Portal from 'preact-portal';

import style from './panel-portal.css';

export interface Props {}

export interface State {
  opened: boolean;
}

export class PanelPortal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      opened: false,
    };
  }

  public render() {
    return (
      <Portal into={'body'}>
        <div
          className={style.panel_portal}
          open={this.state.opened}
          role="dialog"
        >
          {this.props.children}
        </div>
      </Portal>
    );
  }

  public componentDidMount() {
    this.setState({ opened: true });
  }
}
