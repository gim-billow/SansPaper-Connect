import React, {Component} from 'react';
import Svg, {Path, G} from 'react-native-svg';

export default class NotUpdatedIcon extends Component {
  render() {
    const {width, height, color} = this.props;
    return (
      <Svg width={width} height={height} viewBox="0 0 64.000000 64.000000">
        <G
          transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
          fill={color}
          stroke="none">
          <Path d="M317 619 c-3 -10 -14 -19 -24 -19 -41 0 -114 -33 -159 -73 -99 -87 -123 -219 -61 -338 37 -72 92 -122 103 -94 5 11 -5 28 -29 53 -19 20 -42 51 -50 67 -58 116 -3 265 117 321 59 28 106 31 106 9 0 -8 2 -15 5 -15 9 0 75 45 75 51 0 4 -18 18 -39 32 -37 25 -39 25 -44 6z" />
          <Path d="M463 545 c-3 -11 7 -30 30 -53 55 -58 71 -98 71 -172 -1 -77 -24 -131 -79 -178 -62 -55 -165 -84 -165 -47 0 8 -2 15 -5 15 -9 0 -75 -45 -75 -51 0 -4 18 -18 39 -32 36 -24 39 -24 44 -8 3 12 18 20 47 25 88 14 166 75 206 161 53 113 14 277 -82 340 -22 14 -25 14 -31 0z" />
        </G>
      </Svg>
    );
  }
}
