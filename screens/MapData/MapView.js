//import liraries
import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, VirtualizedList, TouchableOpacity, ScrollView,
    TextInput, Platform
} from 'react-native';

import { useRoute } from '@react-navigation/native'
import { COLORS, FONTS, SIZES } from '../../constants';
import { useSelector } from 'react-redux'
import Loader from '../Loader';
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PlaceRow from './PlaceRow';
import * as Location from 'expo-location'
import { Ionicons, MaterialIcons } from 'react-native-vector-icons'
import Geocoder from 'react-native-geocoding'

// create a component
const MapData = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const userInfo = useSelector(state => state.users);
    const [searchData, setSearchData] = useState('');
    const [city, setCity] = useState('');
    const [address_1, setAddress_1] = useState('');
    const [address_2, setAddress_2] = useState('');
    const [pincode, setPincode] = useState('');
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
        'Wait, we are fetching you location...'
    );
    const [location, setLocation] = useState({
        latitude: 22.2587,
        longitude: 71.1924,
    });
    const [markerLo, setMarkerLo] = useState({
        latitude: 22.2587,
        longitude: 71.1924,
    });


    const GetCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert(
                'Permission not granted',
                'Allow the app to use location service.',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        }

        let { coords } = await Location.getCurrentPositionAsync();
        setLocation(coords);
        setMarkerLo(coords);
        if (coords) {
            const { latitude, longitude } = coords;

            getLocationData(latitude, longitude)
        }
    };
    const getLocationData = async (latitude, longitude) => {
        Geocoder.init("AIzaSyCyp5NkufOfhfItDVx2DyfGTpWVRJLp8Dc");
        Geocoder.from(latitude, longitude)
            .then(json => {
                //var addressComponent = json.results[0].address_components[0];

                var len = json.results[0].address_components.length
                var adds = json.results[0].address_components[Number(len) - 1]
                setPincode(adds.long_name)
                setCity(json.results[0].formatted_address);
                setAddress_1(json.results[0].formatted_address)

            })
            .catch(error => console.warn(error));
    }
    useEffect(() => {
        GetCurrentLocation()

    }, [navigation]);

    const handleSubmit = () => {
        setLoading(true);
        const myHeaders = new Headers();
        const formdata = new FormData();
        formdata.append("user_id", userInfo);
        formdata.append("address", address_1);
        formdata.append("address_2", address_2);
        formdata.append("postcode", pincode);
        formdata.append("type", "2");


        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        fetch('https://bhanumart.vitsol.in/api/add_shiping_addres', requestOptions)
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.responce === true) {
                    navigation.navigate('Address');

                } else {
                    setErrortext(responseJson.msg);
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });

    }
    const mapRef = useRef();
    const onRegionChange = (region) => {
        setLocation(region)
        getLocationData(region.latitude, region.longitude)
    }
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', position: 'absolute',
                left: 0, top: 50, zIndex: 1, paddingHorizontal: 5
            }}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back' color={COLORS.white} size={20} />
                </TouchableOpacity>
                <GooglePlacesAutocomplete
                    placeholder='Search your area,location/address?'
                    onPress={(data, details = null) => {
                        setSearchData({ data, details });
                        getLocationData(details.geometry.location.lat, details.geometry.location.lng)
                        setLocation(details.geometry.location)
                    }}
                    enablePoweredByContainer={false}
                    fetchDetails
                    query={{
                        key: "AIzaSyCyp5NkufOfhfItDVx2DyfGTpWVRJLp8Dc",
                        language: 'en',
                    }}
                    renderRow={(data) => <PlaceRow data={data} />}
                />
            </View>
            <Loader loading={loading} />
            <View style={{ flex: 1 }}>
                <MapView
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    zoomControlEnabled={true}
                    zoomEnabled={true}
                    zoomTapEnabled={true}
                    ref={mapRef}
                    region={{
                        latitude: location.lat || location.latitude,
                        longitude: location.lng || location.longitude,
                        latitudeDelta: 0.0022,
                        longitudeDelta: 0.0095,
                    }}
                    pitchEnabled={true}
                    showsMyLocationButton={true}
                    style={styles.map}
                    moveOnMarkerPress={true}
                >

                    <Marker
                        coordinate={{
                            latitude: location.lat || location.latitude,
                        longitude: location.lng || location.longitude,
                        }}
                        onDragEnd={(e) => {onRegionChange(e.nativeEvent.coordinate)}}
                        draggable
                    >
                        <Callout tooltip>
                            {
                                Platform.OS === 'android' ?
                                    <View style={{
                                        flex: 1, marginHorizontal: 20, backgroundColor: COLORS.black,
                                        padding: 10, borderRadius: 10, justifyContent: 'center', marginTop: 100, width: '50%', paddingVertical: 10, height: 100
                                    }}>
                                        <Text style={{ color: COLORS.white }}>My Location</Text>
                                        <Text style={{ color: COLORS.white, width: '100%' }}>{JSON.stringify(city)}</Text>
                                    </View> :
                                    <View style={{
                                        flex: 1, padding: 5, backgroundColor: COLORS.black, marginHorizontal: 10, borderRadius: 10,
                                        width: '50%', alignSelf: 'center', height: 90
                                    }}>
                                        <Text style={{ color: COLORS.white }}>My Location</Text>
                                        <Text style={{ color: COLORS.white, width: '100%' }}>{JSON.stringify(city)}</Text>
                                    </View>
                            }

                        </Callout>

                    </Marker>


                </MapView>
                {
                    Platform.OS === 'android' ?
                        <TouchableOpacity style={{
                            width: 50, height: 50, backgroundColor: 'grba(0,0,0,0.9)', position: 'absolute', right: 10,
                            top: SIZES.height * 0.45, alignItems: 'center', justifyContent: 'center', elevation: 10
                        }}
                            onPress={GetCurrentLocation}>
                            <MaterialIcons name='my-location' color={COLORS.black} size={25} />
                        </TouchableOpacity> :
                        <View />
                }


                <ScrollView style={{ flex: 1, maxHeight: SIZES.height * 0.35 }}>
                    <View style={{ flex: 1, width: '100%', padding: 10 }}>
                        <Text style={{ fontSize: 16, color: COLORS.black, fontWeight: 'bold', marginVertical: 5, paddingLeft: 10 }}>Location from Map</Text>
                        <Text style={{ color: COLORS.gray, paddingLeft: 15, fontWeight: 'bold', paddingBottom: -5 }}>Location</Text>
                        <View style={[styles.SectionStyle, { height: 60, width: '90%', alignItems: 'center' }]}>
                            <MaterialIcons name='my-location' color={COLORS.black} size={20} />
                            <TextInput
                                placeholder='Enter Street'
                                placeholderTextColor={COLORS.lgray}
                                value={address_1}
                                onChangeText={(e) => setAddress_1(e)}
                                style={[styles.inputStyle, {
                                    width: '100%', height: '100%'
                                }]}
                                multiline={true}
                                numberOfLines={5}
                            />
                        </View>
                        <Text style={{ color: COLORS.gray, paddingLeft: 15, fontWeight: 'bold', paddingBottom: -5 }}>Landmark/Building Number(optional)</Text>
                        <View style={[styles.SectionStyle, { alignItems: 'center' }]}>
                            <MaterialIcons name='location-pin' color={COLORS.bgcolor} size={20} />
                            <TextInput
                                placeholder='Enter Landmark or House Number'
                                onChangeText={(e) => setAddress_2(e)}
                                placeholderTextColor={COLORS.lgray}
                                style={[styles.inputStyle, { height: 40 }]}
                                numberOfLines={2}
                            />
                        </View>
                        <Text style={{ color: COLORS.gray, paddingLeft: 15, fontWeight: 'bold', paddingBottom: -5 }}>Postal Code</Text>
                        <View style={[styles.SectionStyle, { alignItems: 'center' }]}>
                            <MaterialIcons name='location-city' color={COLORS.black} size={20} />
                            <TextInput
                                placeholder='Enter Landmark or House Number'
                                placeholderTextColor={COLORS.lgray}
                                onChangeText={(e) => setPincode(e)}
                                value={pincode}
                                style={[styles.inputStyle, { height: 40 }]}
                                numberOfLines={2}
                            />
                        </View>

                        <TouchableOpacity style={{
                            flex: 1, height: 35, backgroundColor: COLORS.bgcolor, justifyContent: 'center',
                            alignItems: 'center', borderRadius: 10, marginTop: 8, marginHorizontal: 15
                        }}
                            onPress={handleSubmit}>
                            <Text style={{ color: COLORS.white, fontWeight: 'bold' }} numberOfLines={2}>Use Location</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>


        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40
    },
    box: {
        backgroundColor: 'rgba(0,0,0,0.45)',
        padding: 10,
        paddingHorizontal: 15,
        margin: 5,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 5,
        left: 5,
        flex: 1,
        width: '95%',
        alignSelf: 'center'
    },
    map: {
        width: '100%',
        height: SIZES.height * 0.65,
        flex: 1,
        maxHeight: SIZES.height * 0.65
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        color: COLORS.primary,
        paddingLeft: 10,
        paddingRight: 5,
        borderWidth: 1,
        borderColor: COLORS.gray,
        marginHorizontal: 2,
        borderRadius: 8
    },
    shadow: {
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 0, height: 6
        },
        shadowRadius: 16,
        elevation: 25
    },
    buttonContainer: {
        width: SIZES.padding * 1.6,
        height: SIZES.padding * 1.3,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.black,
        marginRight: 5
    },
    textInput: {
        backgroundColor: COLORS.white,
        marginVertical: 5,
        marginLeft: 10,
        borderRadius: 15,
        height: 50,
        width: '80%',
        paddingLeft: 6
    },
    autoCompleteContainer: {
        borderRadius: 15,
        flex: 1, marginRight: 8
    },
    seperator: {
        backgroundColor: '#efefef',
        height: 1
    },
});

//make this component available to the app
export default MapData;

