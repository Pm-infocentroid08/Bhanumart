//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { SIZES, COLORS } from '../../constants'
import HeaderBar from '../../components/HeaderBar';
import { useDispatch, useSelector } from 'react-redux'
import { add } from 'react-native-reanimated';
import { FontAwesome,MaterialIcons } from 'react-native-vector-icons'
import { Alert } from 'react-native';
import * as Location from 'expo-location'
import Loader from '../Loader';
import { BASE_URL } from './../../Base';
// create a component
const AddressEdit = ({ navigation }) => {
    const [users, setUsers] = useState('');
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState('');
    const [isAddSelected, setIsAddSelected] = useState(false);
    const [sadd, setSAdd] = useState([]);
    const [defPress, setDefPress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [pinch, setPinch] = useState('');
  
    const onDefault = () => {
        setSelectedAddress(null)
        setDefPress(true);
    };
    const onAddSelect = (id) => {
        setSelectedAddress(id)
        setDefPress(false);
    };
    const userInfo = useSelector(state => state.users);

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

    const checkDelivery = () => {
        const myHeadersdel = new Headers();
       
        const formdatadel = new FormData();
        formdatadel.append("pincode", sadd.pincode);

        const requestOptionsdel = {
            method: 'POST',
            headers: myHeadersdel,
            body: formdatadel,
            redirect: 'follow'
        };

        fetch(BASE_URL+"get_delivery_area", requestOptionsdel)
        .then(response => response.json())
        .then(result => {
            if (result.responce === true) {
                navigation.navigate('Invoice', { sadd })
            } else {
                setIsAddSelected(false);
                setPinch('Sorry for Inconvience. Currently we are not available on this Delivery Location.');
            }
        })
        .catch(error => console.log('error', error))
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
    }, [navigation]);

    
    return (
        <View style={styles.container}>
            <HeaderBar titleText='Select Address' onPress={() => navigation.goBack()} />
            <Loader loading={loading}/>
            <View style={styles.hBox}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CurrentLo')}>
                    <Text style={styles.btext}>
                    <MaterialIcons name='location-pin' color={COLORS.bgcolor} size={14} />{' '}Get Current Location</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,{flexDirection:'row',justifyContent:'center',alignItems:'center'}]} onPress={() => navigation.navigate('Checkout')}>
                <MaterialIcons name='add-circle-outline' color={COLORS.gray} size={16} />
                    <Text style={styles.btext}>
                   {'  '}Add New Address</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.seperator} />
            
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.aBox}>
                        <View>
                            <Text style={[styles.btext, { fontWeight: 'bold', marginLeft: 10, borderBottomWidth: 1, paddingLeft: 5, paddingBottom: 5, width: '30%' }]}>Personal Details</Text>
                            <Text style={{ paddingVertical: 10, paddingLeft: 10 }}>{users.firstname}{' '}{users.lastname}</Text>
                            <View style={styles.flexd}>
                                <Text>{users.email}</Text>
                                <Text>+91 {users.telephone}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{ fontWeight: 'bold', color: COLORS.black, margin: 8, marginLeft: 15 }}>Select Address</Text>
                    <View style={styles.seperator} />
               

                    <View style={{ flex: 1, marginTop: 2 }}>
                        <FlatList
                            data={address}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => (
                                <View style={{
                                    flex: 1, marginTop: -12, paddingTop: 5, flexDirection: 'row', justifyContent: 'space-around',
                                    alignItems: 'center', paddingHorizontal: 20
                                }} key={index}>
                                    <View>
                                        {
                                            (selectedAddress === item.id) ?
                                                <FontAwesome name='check-circle-o' color={COLORS.bgcolor} size={20} /> :
                                                <FontAwesome name='circle-o' color={COLORS.gray} size={20} />
                                        }

                                    </View>
                                    <TouchableOpacity style={[styles.aBox, {
                                        marginHorizontal: 15, borderColor: (selectedAddress === item.id) ?
                                            COLORS.bgcolor : COLORS.gray
                                    }]}
                                        onPress={() => {
                                            
                                            setSAdd({
                                                'address': item.address,
                                                'city': item.city_id,
                                                'state': item.state_id,
                                                'country': item.country_id,
                                                'pincode': item.postcode,
                                                'city_id': item.city_id,
                                                'state_id': item.state_id
                                            }); setIsAddSelected(true); onAddSelect(item.id)
                                        }} key={item.id}>
                                        {
                                            item.type==='1'?
                                            <View style={{ marginTop: 10 }}>
                                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                                <Text style={[styles.btext, { fontWeight: 'bold', marginLeft: 10, borderBottomWidth: 1, paddingBottom: 5, width: '30%' }]}>Address</Text>
                                                  <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                                  <TouchableOpacity onPress={()=>{navigation.navigate('UpAdd',{item})}} style={{
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
                                        <View style={{ marginTop: 10 }}>
                                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                                <Text style={[styles.btext, { fontWeight: 'bold', marginLeft: 10, borderBottomWidth: 1, paddingBottom: 5, width: '30%' }]}>Address</Text>
                                                  <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                                  <TouchableOpacity onPress={()=>{navigation.navigate('MapEdt',{item})}} style={{
                                                        marginTop:-10,borderWidth:1,borderColor:COLORS.gray,
                                                        justifyContent:'center',alignItems:'center',borderRadius:5,marginHorizontal:5
                                                    }}>
                                                        <MaterialIcons name='edit' color={COLORS.gray} size={20} />
                                                    </TouchableOpacity>
                                                  <TouchableOpacity onPress={()=>deleteAdd(item.id)} style={{
                                                        marginTop:-10,borderWidth:1,borderColor:COLORS.bgcolor,
                                                        justifyContent:'center',alignItems:'center',borderRadius:5
                                                    }}>
                                                        <MaterialIcons name='delete' color={COLORS.bgcolor} size={20}/>
                                                    </TouchableOpacity>
                                                   
                                                  </View>  
                                            </View>                                            
                                            <Text style={{ paddingTop: 6, paddingLeft: 10 }}>{item.address} {' '}{item.address_2}</Text>
                                            
                                        </View>
                                        }
                                       
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>

                </ScrollView>
            <View style={{ height: 60, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                {
                    isAddSelected === false ? <View style={{
                        flex: 1, paddingHorizontal: 25, maxHeight: 40, justifyContent: 'center',
                            alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 8
                    }}>
                        <Text style={{color:COLORS.bgcolor,fontWeight:'bold'}}>{pinch}</Text>
                    </View> :
                        <TouchableOpacity style={{
                            flex: 1, paddingHorizontal: 30, maxHeight: 40, justifyContent: 'center',
                            alignItems: 'center', backgroundColor: COLORS.black, borderRadius: 8
                        }} onPress={() => checkDelivery()}>
                            <Text style={{ color: COLORS.white }}>Continue</Text>
                        </TouchableOpacity>
                }

            </View>
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
    hBox: {
        alignItems: 'center',
        paddingRight: 15,
        flex: 1,
        maxHeight:90
    },
    button: {
        flex:1,
        width:'90%',
        height: 30,
        maxHeight:30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.lgray,
        borderRadius: 8,
        marginVertical:5
    },
    btext: {
        fontWeight: '800',
        color: COLORS.darkgray,
        textTransform:'uppercase'
    },
    seperator: {
        backgroundColor: COLORS.lgray,
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
    aBoxc: {
        flex: 1,
        margin: 10,
        borderWidth: 1,
        borderColor: COLORS.lgray,
        borderRadius: 10,
        padding: 10,
        maxHeight: SIZES.height * 0.45
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
export default AddressEdit;
