import React, {Component} from 'react';
import Svg, {Path, G} from 'react-native-svg';

export default class MailIcon extends Component {
  render() {
    const {width, height, color} = this.props;
    return (
      <Svg width={width} height={height} viewBox="0 0 64.000000 64.000000">
        <G
          transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
          fill={color}
          stroke="none">
          <Path
            d="M251 630 c-89 -19 -182 -96 -223 -185 -30 -68 -31 -180 -1 -247 30
       -65 95 -133 160 -165 79 -38 187 -38 266 0 65 32 131 100 160 165 29 67 28
       179 -2 249 -27 61 -102 136 -164 163 -52 23 -138 31 -196 20z m253 -166 c14
       -5 16 -28 16 -145 l0 -139 -200 0 -200 0 0 139 c0 102 3 141 13 144 18 8 352
       8 371 1z"
          />
          <Path
            d="M252 365 c35 -30 65 -54 68 -54 3 0 33 24 68 54 l63 55 -131 0 -131
       0 63 -55z"
          />
          <Path
            d="M160 321 l0 -82 28 19 c15 11 35 28 44 39 17 18 16 21 -27 63 l-45
       44 0 -83z"
          />
          <Path
            d="M432 357 l-43 -44 43 -37 43 -37 3 40 c2 23 2 59 0 82 l-3 40 -43
       -44z"
          />
          <Path
            d="M238 255 c-21 -20 -38 -37 -38 -40 0 -3 54 -5 120 -5 66 0 120 3 119
       8 0 4 -18 22 -40 41 -38 33 -40 33 -59 16 -19 -17 -21 -17 -38 -2 -10 10 -20
       17 -23 17 -2 0 -21 -16 -41 -35z"
          />
        </G>
      </Svg>
    );
  }
}
