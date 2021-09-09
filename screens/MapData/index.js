//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,FlatList } from 'react-native';
import HeaderBar from '../../components/HeaderBar/index'
import { COLORS, FONTS, SIZES } from '../../constants';
import { MaterialIcons, FontAwesome } from 'react-native-vector-icons'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PlaceRow from './PlaceRow';
import { useDispatch, useSelector } from 'react-redux'
import * as Location from 'expo-location'
import Loader from './../Loader';
import Geocoder from 'react-native-geocoding';
import { BASE_URL } from './../../Base';
// create a component

const AddressPage = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [users, setUsers] = useState('');
    const [loading, setLoading] = useState(true);
    const userInfo = useSelector(state => state.users);
    const [address, setAddress] = useState('');
    const [city, setCity ] = useState('');
    
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
        'Wait, we are fetching you location...'
      );
    
    const getProfile = () => {
        const myHeaders = new Headers();


        const formdata = new FormData();
        formdata.append("user_id", userInfo);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL+"get_profile", requestOptions)
            .then(response => response.json())
            .then(result => setUsers(result.data))
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }

    const getAddres = () => {
        const myHeadersa = new Headers();


        const formdataa = new FormData();
        formdataa.append("user_id", userInfo);

        const requestOptionsa = {
            method: 'POST',
            headers: myHeadersa,
            body: formdataa,
            redirect: 'follow'
        };

        fetch(BASE_URL+"get_address", requestOptionsa)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setAddress(result.data)
                } else {
                    setAddress('')
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }
    const deleteAdd=(item)=>{
        const myHeadersdelt = new Headers();
               
        const formdatadelt = new FormData();
        formdatadelt.append("address_id", item);
        
        const requestOptionsdelt = {
          method: 'POST',
          headers: myHeadersdelt,
          body: formdatadelt,
          redirect: 'follow'
        };
        
        fetch(BASE_URL+"remove_shiping_addres", requestOptionsdelt)
        .then(response => response.json())
        .then(result => {
            if (result.responce === true) {
                getAddres();
                getProfile();
            } else {
                Alert.alert('Unable to delete this address')
            }
        })
        .catch(error => console.log('error', error))
    }
    useEffect(() => {
        getProfile();
        getAddres();
        const willFocusSubscription = navigation.addListener('focus', () => {
            getProfile();
            getAddres();
        });

        return willFocusSubscription;
    }, [navigation])

   
   
    return (
        <View style={styles.container}>
            <HeaderBar titleText='Select Address' onPress={() => navigation.goBack()} />
            <Loader loading={loading} />
            
            <TouchableOpacity style={{
                height: 40, marginHorizontal: 20, justifyContent: 'center',
                alignItems: 'center', flexDirection: 'row', borderWidth: 1,
                borderColor: COLORS.lgray, borderRadius: 10, marginBottom: 5
            }}
            onPress={()=>navigation.navigate('MapView')}>
                <MaterialIcons name='location-pin' color={COLORS.bgcolor} size={18} />
                <Text style={{textTransform:'uppercase'}}>Use Current Location</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal:10,backgroundColor: COLORS.lightGray, padding: SIZES.base, paddingHorizontal: SIZES.padding }}
            onPress={()=>navigation.navigate('UserForm')}>
                
                    <MaterialIcons name='add-circle' color={COLORS.black} size={30} />
              
                <Text style={{ ...FONTS.h2, fontWeight: 'bold', marginLeft: SIZES.radius,textTransform:'uppercase' }}>Add Address</Text>
            </TouchableOpacity>
            <ScrollView style={{flex:1}}>
                    <View style={styles.aBox}>
                    {
                        users ? <View>
                            <Text style={[styles.btext, { fontWeight: 'bold', marginLeft: 10, borderBottomWidth: 1, paddingLeft: 5, paddingBottom: 5, width: '50%' }]}>Personal Details</Text>
                            <Text style={{ paddingVertical: 10, paddingLeft: 10 }}>{users.firstname}{' '}{users.lastname}</Text>
                            <View style={styles.flexd}>
                                <Text>{users.email}</Text>
                                <Text>+91 {users.telephone}</Text>
                            </View>
                        </View>:
                        <View>
                            <Text style={[styles.btext, { fontWeight: 'bold', marginLeft: 10, borderBottomWidth: 1, paddingLeft: 5, paddingBottom: 5, width: '50%' }]}>Personal Details</Text>
                            <Text style={{ paddingVertical: 10, paddingLeft: 10 }}>Your Name</Text>
                            <View style={styles.flexd}>
                                <Text>Email Address</Text>
                                <Text>+91 Mobile Number</Text>
                            </View>
                        </View>
                    }
                        
                    </View>
                    <Text style={[styles.btext, { fontWeight: 'bold', marginVertical:10, borderBottomWidth: 1, marginLeft:15, paddingBottom: 5, width: '30%',paddingLeft:10 }]}>Address</Text>
                    <FlatList
                            data={address}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => (
                                <View style={styles.aBox}>
                                {
                                            item.type==='1'?
                        <View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                                <Text style={[styles.btext, { fontWeight: 'bold', marginLeft: 10, borderBottomWidth: 1, paddingBottom: 5, width: '30%' }]}>Address Details</Text>
                                                  <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                                  <TouchableOpacity onPress={()=>{navigation.navigate('EditAddr',{item})}} style={{
                                                        marginTop:-10,borderWidth:1,borderColor:COLORS.gray,
                                                        justifyContent:'center',alignItems:'center',borderRadius:5,marginHorizontal:5
                                                    }}>
                                                        <MaterialIcons name='edit' color={COLORS.gray} size={20} />
                                                    </TouchableOpacity>
                                                  <TouchableOpacity onPress={()=>deleteAdd(item.id)} style={{
                                                        marginTop:-10,borderWidth:1,borderColor:COLORS.bgcolor,
                                                        justifyContent:'center',alignItems:'center',borderRadius:5
                                                    }}>
                                                        <MaterialIcons name='delete' color={COLORS.bgcolor} size={20} />
                                                    </TouchableOpacity>
                                                   
                                                  </View>  
                                            </View>      
                                            <Text style={{ paddingTop: 6, paddingLeft: 10 }}>{item.address},{' '}{item.address_2},{' '}{item.city_id},{' '}{item.state_id}</Text>
                                            <Text style={{ paddingVertical: 3, paddingLeft: 10 }}>{users.country_id},{' '}{item.postcode}</Text>
                        </View>:
                        <View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                                <Text style={[styles.btext, { fontWeight: 'bold', marginLeft: 10, borderBottomWidth: 1, paddingBottom: 5, width: '30%' }]}>Address Details</Text>
                                                  <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                                  <TouchableOpacity onPress={()=>{navigation.navigate('MapHEdt',{item})}} style={{
                                                        marginTop:-10,borderWidth:1,borderColor:COLORS.gray,
                                                        justifyContent:'center',alignItems:'center',borderRadius:5,marginHorizontal:5
                                                    }}>
                                                        <MaterialIcons name='edit' color={COLORS.gray} size={20} />
                                                    </TouchableOpacity>
                                                  <TouchableOpacity onPress={()=>deleteAdd(item.id)} style={{
                                                        marginTop:-10,borderWidth:1,borderColor:COLORS.bgcolor,
                                                        justifyContent:'center',alignItems:'center',borderRadius:5
                                                    }}>
                                                        <MaterialIcons name='delete' color={COLORS.bgcolor} size={20} />
                                                    </TouchableOpacity>
                                                   
                                                  </View>  
                                            </View>                                            
                                            <Text style={{ paddingTop: 6, paddingLeft: 10 }}>{item.address} {' '}{item.address_2}</Text>
                        </View>}
                    </View>
                            )}/>
            </ScrollView>
          
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 45
    },
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.gray,
        marginHorizontal: SIZES.radius,
        marginVertical: 10,
        borderRadius: 15,
        height: 40
    },
    seperator: {
        backgroundColor: '#efefef',
        height: 1
    },
    aBox: {
        flex: 1,
        margin: 10,
        borderWidth: 1,
        borderColor: COLORS.lgray,
        borderRadius: 10,
        padding: 10,
        maxHeight: SIZES.height * 0.3
    },
    flexd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '100%',
        paddingHorizontal: 10
    }
});

//make this component available to the app
export default AddressPage;
