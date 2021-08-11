//import liraries
import React, { useRef,useState  } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { SIZES } from '../../constants';
import { COLORS } from './../../constants/theme';

// create a component
const LocationMap = ({originalPlace}) => {
    const origin = {
      latitude:originalPlace.latitude,
      longitude:originalPlace.longitude,
       };
      
       const GOOGLE_MAPS_APIKEY = 'AIzaSyDwd4ieByqGhi1b4I93K4NdURibZBqEwoY';
       const mapRef= useRef();
    return (
        
            <MapView
            showsUserLocation={true}
              ref={mapRef}              
              initialRegion={{
                latitude:originalPlace.latitude,
                longitude:originalPlace.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              style={styles.map}
            >
             
              <Marker
                  coordinate={origin}  
                  title='Your Location'                                            
                  />
                
            </MapView>
       
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        height:'100%',
        backgroundColor: '#fff',
    },
    map: {
        width: '100%',
        height: '100%',
      },
});

//make this component available to the app
export default LocationMap;
