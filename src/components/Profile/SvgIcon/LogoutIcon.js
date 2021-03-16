import React, {Component} from 'react';
import Svg, {Path, G} from 'react-native-svg';

export default class LogoutIcon extends Component {
  render() {
    const {width, height, color} = this.props;
    return (
      <Svg width={width} height={height} viewBox="0 0 64.000000 64.000000">
        <G
          transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
          fill={color}
          stroke="none">
          <Path d="M282 568 c-16 -16 -16 -160 0 -176 15 -15 61 -15 76 0 7 7 12 42 12 88 0 83 -9 100 -50 100 -14 0 -31 -5 -38 -12z" />
          <Path d="M122 497 c-37 -39 -64 -114 -63 -178 0 -149 111 -259 261 -259 152 0 260 108 260 260 0 121 -79 237 -128 188 -18 -18 -15 -36 12 -71 57 -75 51-182 -14 -247 -59 -59 -133 -74 -205 -41 -106 49 -146 164 -90 256 47 77 49 83 35 100 -18 21 -43 19 -68 -8z" />
        </G>
      </Svg>
    );
  }
}
