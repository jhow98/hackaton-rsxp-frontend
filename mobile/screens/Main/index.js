import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform } from 'react-native';
import { Content, Card, CardItem, Body } from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        location: null,
        move: null,
        errorMessage: null,
    }
  }

  async componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
    this._getLocationAsync();
      setInterval(async () => {
        let move = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        this.setState({ move: move.coords });
      }, 1000)
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    this.setState({ location });
  };

  render() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        mapStyle: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height + 25,
        },
    });
    console.log(this.state.move)
    return (
      <>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <MapView 
            initialRegion={{
                latitude: this.state.location ? this.state.location.coords.latitude : 0,
                longitude: this.state.location ? this.state.location.coords.longitude : 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            style={styles.mapStyle} 
        >
            <Marker
                coordinate={{latitude: this.state.move ? this.state.move.latitude : 0, longitude: this.state.move ? this.state.move.longitude : 0}}
                title={<Text>Teste</Text>}
                description="VAI"
            />
        </MapView>
        <Text>a</Text>
      </View>
      </>
    );
  }
  
}
