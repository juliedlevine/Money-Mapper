console.disableYellowBox = true;
import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import { updateLocation } from '../actions';
import config from './common/config';

class LocationSearch extends React.Component {

  selectedLocation(location) {
      this.props.updateLocation(location)
  }

  render() {
      return (
        <GooglePlacesAutocomplete
          placeholder='Location (leave blank if none)'
          minLength={2}
          autoFocus={false}
          listViewDisplayed='auto'
          fetchDetails={true}
          renderDescription={(row) => row.description}
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
              let location = details.formatted_address;
              this.selectedLocation(location);
          }}
          getDefaultValue={() => {
            return '';
          }}
          query={{
            key: config.googlePlacesKey,
            language: 'en',
          }}
          styles={{
            description: {
                fontFamily: 'Avenir',
                fontWeight: '300',
            },
            textInput: {
                fontFamily: 'Avenir',
                fontWeight: '300',
                paddingBottom: 5,
            },
          }}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
          }}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
          debounce={200}
        />
      );
    }

}



export default connect(null, { updateLocation })(LocationSearch);
