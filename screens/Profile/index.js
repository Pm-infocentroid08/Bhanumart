//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator,Alert} from 'react-native';
import { FONTS, COLORS, SIZES } from '../../constants/index'
import HeaderBar from '../../components/HeaderBar/index'
import ProfileList from '../../components/Container/ProfileList';
import Button from '../../components/Container/Button';
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from "react-native-flash-message";
import { FontAwesome5 } from 'react-native-vector-icons'
import Loader from '../Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabRouter, useIsFocused } from '@react-navigation/native'
// create a component

const Profile = ({ navigation }) => {

    const [users, setUsers] = useState('');
    const [loading, setLoading] = useState(true);
    const userInfo = useSelector(state => state.users);
    const isFocused = useIsFocused();
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

        fetch("https://bhanumart.vitsol.in/api/get_profile", requestOptions)
            .then(response => response.json())
            .then(result => setUsers(result.data))
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }


    useEffect(() => {
        getProfile();
        const unsubscribe = navigation.addListener('focus', () => {
            getProfile();
        });
        return unsubscribe;
    }, [isFocused, navigation]);
    function renderHeader() {
        return (
            <View style={styles.hContainer}>
                <HeaderBar titleText='Profile' onPress={() => navigation.goBack()} />
                <Loader loading={loading} />
                <View style={styles.profileContainer}>

                    <View style={styles.image}>
                        <Image

                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcaHa76x9Ub4pBpc2Oth_fVuYn5gJ3zfkgpQ&usqp=CAU' }}
                            resizeMode='cover'
                            style={{
                                width: '95%',
                                height: '95%',
                                borderRadius: SIZES.width / 1.25,
                            }}
                        />
                    </View>
                    <View style={styles.infoContainer}>
                    {
                        users ? <View style={styles.bin}>
                            <Text style={styles.htex}>Personal Info.</Text>
                            <Text style={styles.stex}><FontAwesome5 name='user-alt' color={COLORS.gray} size={12} /> {' '}{users.firstname}{' '}{users.lastname}</Text>
                            <Text style={styles.stex}><FontAwesome5 name='mail-bulk' color={COLORS.gray} size={12} />{' '} {users.email}</Text>
                            <Text style={styles.stex}><FontAwesome5 name='phone-square' color={COLORS.gray} size={12} /> {' '}+91 {users.telephone}</Text>
                        </View>  :
                        <View style={styles.bin}>
                            <Text style={styles.htex}>Personal Info.</Text>
                            <Text style={styles.stex}><FontAwesome5 name='user-alt' color={COLORS.gray} size={12} /> {' '}Your Name</Text>
                            <Text style={styles.stex}><FontAwesome5 name='mail-bulk' color={COLORS.gray} size={12} />{' '} Your Email</Text>
                            <Text style={styles.stex}><FontAwesome5 name='phone-square' color={COLORS.gray} size={12} /> {' '}+91 Your Mobile Number</Text>
                        </View>  
                    }
                                              
                    </View>
                </View>
               <View style={styles.liCard}>
               <ProfileList iconType='logo-dropbox' hTitle='Orders'
                    onPress={() =>navigation.navigate('Orders')} />
                <View style={styles.seperator} />
                <ProfileList iconType='cart' hTitle='My Cart'
                    onPress={() =>navigation.navigate('Cart')} />
                <View style={styles.seperator} />
                <ProfileList iconType='heart' hTitle='My Wishlist'
                    onPress={() =>navigation.navigate('Wish')} />
                <View style={styles.seperator} />
                <ProfileList iconType='help-buoy' hTitle='Help & Support' onPress={() => navigation.navigate('Contact')} />
                <View style={styles.seperator} />
               </View>              
               <Button bText='Logout' 
               onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    AsyncStorage.clear();
                    navigation.replace('Auth');
                  },
                },
              ],
              {cancelable: false},
            );
          }} />
                </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                {renderHeader()}
            </ScrollView>
            <View style={{ position: 'absolute', width: 35, height: 35, top: 60, right: 15 }}>
                <TouchableOpacity style={{
                    width: '100%', height: '100%',
                    borderRadius: 5, backgroundColor: 'tomato',
                    justifyContent: 'center', alignItems: 'center'
                }}
                    onPress={() => navigation.navigate('Eprofile')}>
                    <FontAwesome5 name='user-edit' color='#fff' size={15} />

                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    hContainer: {
        flex: 1,
        paddingTop: 40
    },
    profileContainer: {
        flex:1,
        width: SIZES.width,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: SIZES.width / 3.5,
        height: SIZES.width / 3.5,
        borderRadius: SIZES.width / 1.75,
        borderWidth: 5,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:5
    },
    bin:{
        flex:1,
        marginHorizontal:55,
        marginTop:5,
        padding:10,
        backgroundColor:COLORS.white,
        borderRadius:10
    },
    htex:{
        fontWeight:'bold',
        color:COLORS.black,
        fontSize:15,
        borderBottomWidth:1,
        borderBottomColor:COLORS.gray,
        width:'60%',
        paddingLeft:5,
        marginBottom:10
    },
    stex:{
        color:COLORS.gray,
        fontSize:14
    },
    liCard:{
        margin:10,
        padding:16,
        borderRadius:15,
        backgroundColor:COLORS.white
    },
    seperator: {
        width: '100%',
        height: 1,
        backgroundColor: COLORS.lgray
    }
});

//make this component available to the app
export default Profile;
