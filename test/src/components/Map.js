console.disableYellowBox = true;
import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialLocation: {
                latitude: 33.8499041,
                longitude: -84.3730464,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            },
            purchases: []
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                var newLocation = {latitude: position.coords.latitude,
                                  longitude: position.coords.longitude,
                                  latitudeDelta: 0.1,
                                  longitudeDelta: 0.1
                                }
                this.setState({ initialLocation: newLocation });
                // console.log('Initial Position', initialPosition);
            }
        );

        axios.post('http://et.briley.org/api/expenseswithlocation', {
          token: this.props.token
        })
        .then(expenses => {
          this.setState({ purchases: expenses.data });
        })
        .catch(err => console.log(err.message));

    }

    createMarkers(){
      let markers = this.state.purchases.map(purchase => <MapView.Marker coordinate={{latitude: purchase.latitude, longitude: purchase.longitude }} title={purchase.description} description={purchase.amount} image={require('./Resources/maps-and-flags.png')} />);
      return markers;

    }

    render() {
      console.log('expenses: ', this.state.purchases);
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={this.state.initialLocation}
                    region={this.state.initialLocation}
                    showsMyLocationButton="true"
                    rotateEnabled="false"
                    >
                    {this.createMarkers()}
                  {/* <MapView.Marker
                    coordinate={{
                        latitude: 33.8499041,
                        longitude: -84.3730464,
                    }}
                    title={'Subway'}
                    description={'$5.70'}
                    image={require('./Resources/maps-and-flags.png')}

                  />
                  <MapView.Marker
                    coordinate={{
                        latitude: 33.84993,
                        longitude: -84.3734,
                    }}
                    title={'Chipotle'}
                    description={'$5.70'}
                    image={require('./Resources/maps-and-flags.png')}

                  /> */}
                </MapView>
            </View>
        )
    }
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.user.token,
        categorySelected: state.expenses.categorySelected
    };
};

export default connect(mapStateToProps)(Map);
