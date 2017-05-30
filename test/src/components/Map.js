console.disableYellowBox = true;
import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native';
import MapView from 'react-native-maps';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialLocation: {
                latitude: 33.8499041,
                longitude: -84.3730464,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }
        }
    }

    // componentDidMount() {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             var initialPosition = JSON.stringify(position);
    //             this.setState({ initialLocation: initialPosition });
    //             console.log('Initial Position', initialPosition);
    //         }
    //     )
    // }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={this.state.initialLocation}>
                  <MapView.Marker
                    coordinate={{
                        latitude: 33.8499041,
                        longitude: -84.3730464,
                    }}
                    title={'Subway'}
                    description={'$5.70'}
                    image={require('./Resources/maps-and-flags.png')}

                  />
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
