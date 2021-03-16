import React, {Component} from 'react';
import Svg, {Path, G} from 'react-native-svg';

export default class UpdatedIcon extends Component {
  render() {
    const {width, height, color} = this.props;
    return (
      <Svg width={width} height={height} viewBox="0 0 64.000000 64.000000">
        <G
          transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
          fill={color}
          stroke="none">
          <Path d="M320 622 c0 -14 -13 -21 -59 -30 -97 -20 -187 -103 -212 -196 -15 -56 -6 -153 19 -203 25 -47 77 -103 98 -103 24 0 16 20 -30 71 -125 140 -53 356 133 398 39 8 44 7 48 -10 7 -25 11 -24 51 9 l34 28 -41 27 c-36 24 -41 25 -41 9z" />
          <Path d="M460 538 c0 -7 18 -31 40 -52 133 -131 59 -363 -128 -405 -38 -8 -44 -7 -50 10 -7 18 -9 18 -45 -7 l-38 -26 38 -28 c35 -27 38 -27 41 -9 2 10 11 19 21 19 45 0 122 33 165 71 63 56 88 107 94 195 4 62 1 80 -22 129 -26 58 -77 115 -102 115 -8 0 -14 -6 -14 -12z" />
          <Path d="M348 350 l-73 -59 -22 24 c-29 32 -63 33 -63 2 0 -27 55 -97 77 -97 15 0 154 106 180 138 13 16 8 38 -12 46 -8 3 -47 -22 -87 -54z" />
        </G>
      </Svg>
    );
  }
}
