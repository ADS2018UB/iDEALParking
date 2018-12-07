import { Component, h } from 'preact';

import style from './district-banner.css';
import { District } from '../../services/api/api.interfaces';

export class DistrictBanner extends Component<District, {}> {
  public render() {
    return (
      <section className={style.district_banner}>
        <img
          className={style.district_banner__img}
          alt="Pic of district"
          src={`assets/districte_${this.props.district_number}.jpg`}
        />
        <header className={style.district_banner__header}>
          {this.props.name}
          <div style="font-size: 0.75em">Barcelona</div>
        </header>
      </section>
    );
  }
}
