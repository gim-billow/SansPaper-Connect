import React from 'react';
import {View, Dimensions, Text, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
import analytics from '@react-native-firebase/analytics';
import {NavigationComponent, Navigation} from 'react-native-navigation';

import Geocoder from 'react-native-geocoding';
import {showActivityIndicator, dismissActivityIndicator} from 'navigation';

import {screens} from '@constant/ScreenConstants';
import styles from './styles';
import {red} from '@styles/colors';
import {uniqueKey} from '@util/general';
import {getTextInsideParens} from '@util/string';
import {GOOGLE_API_KEY} from '@constant/Keys';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0043;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapScreen extends NavigationComponent {
  state = {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    marker: {
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
      key: '0',
    },
    address: 'Drop a pin or search a location',
  };

  componentDidMount() {
    navigator.geolocation = require('react-native-geolocation-service');
    this.onInitCurrentLocation();
  }

  componentDidAppear() {
    Navigation.events().registerComponentDidAppearListener(
      async ({componentName, componentType}) => {
        if (componentType === 'Component') {
          await analytics().logScreenView({
            screen_name: componentName,
            screen_class: componentName,
          });
        }
      },
    );
  }

  async onInitCurrentLocation() {
    const {address} = this.props;

    // if address with long lat is given
    if (address) {
      const coordinates = getTextInsideParens(address);
      const addr = address.split('(')[0];
      const longLat = coordinates.split(',');

      this.setCoordinates(parseFloat(longLat[0]), parseFloat(longLat[1]), addr);

      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        this.setCoordinates(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      (error) => {
        this.renderAlert();
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 2000},
    );
  }

  onMapPress(e) {
    showActivityIndicator();
    const {longitude, latitude} = e.nativeEvent.coordinate;

    Geocoder.from([latitude, longitude])
      .then((json) => {
        const addr = json.results[0].formatted_address;

        this.setCoordinates(latitude, longitude, addr);
        dismissActivityIndicator();
      })
      .catch((error) => {
        dismissActivityIndicator();
        console.log('error', error);
        this.renderAlert();
      }).ti;
  }

  renderAlert() {
    return Alert.alert(
      'Alert',
      'Unable to retrieve your current location, please check if GPS is turn on and try again',
    );
  }

  setCoordinates(latitude, longitude, address) {
    let markers = {...this.state.marker};
    let regions = {...this.state.region};

    // set markers
    markers = {
      key: uniqueKey(),
      coordinate: {
        longitude,
        latitude,
      },
    };
    // set region
    regions.latitude = latitude;
    regions.longitude = longitude;

    this.setState({
      marker: {...markers},
      region: {...regions},
      address: address ? address : this.state.address,
    });

    this.props.setText(`${address} (${latitude},${longitude})`);
  }

  render() {
    const {marker, address, region} = this.state;
    const {setText} = this.props;

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={this.state.region}
          onPress={(e) => this.onMapPress(e)}>
          <Marker
            key={marker.key}
            coordinate={marker.coordinate}
            pinColor={red}
          />
        </MapView>
        <View style={styles.buttonContainer}>
          <GooglePlacesAutocomplete
            placeholder="Search location"
            onPress={(data, details = null) => {
              const {location} = details.geometry;

              this.setCoordinates(
                location.lat,
                location.lng,
                details.formatted_address,
              );
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
            }}
            fetchDetails
            debounce={500}
            styles={{
              poweredContainer: {
                display: 'none',
              },
            }}
          />
        </View>
        <View style={styles.bubbleContainer}>
          <View style={styles.bubble}>
            <Text>{address}</Text>
          </View>
        </View>
      </View>
    );
  }
}

MapScreen.options = {
  topBar: {
    title: {
      text: 'Location',
    },
    backButton: {
      showTitle: false,
    },
    rightButtons: [
      {
        id: screens.SelectMap,
        component: {
          name: screens.SelectMap,
        },
      },
    ],
  },
  bottomTabs: {
    visible: false,
  },
};

export default MapScreen;
