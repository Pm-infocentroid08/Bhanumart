//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Alert, ScrollView, TouchableOpacity, Image,Platform } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/index'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from './../../Base';

// create a component
const Banner = () => {
    const navigation = useNavigation();
    const [isLoading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    const [data, setData] = useState([]);
    const [banner, setBanner] = useState([]);
    const isCarousel = React.useRef(null);
    const [index, setIndex] = useState(0);

    const getFlexImg = () => {
        const myHeaders = new Headers();
        
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(BASE_URL+"get_banner", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.responce === true) {
                setBanner(result.data[0])
               
            } else {
                Alert.alert('Banner data not found')
            }
        })
        .catch(error => console.log('error', error))
        .finally(() => setLoading(false))
        .finally(setLoading.bind(undefined, false));
    }

    const getBanner = () => {
        const myHeadersb = new Headers();
        const requestOptionsb = {
            method: 'GET',
            headers: myHeadersb,
            redirect: 'follow'
        };
        fetch(BASE_URL+"get_slider_producttyp", requestOptionsb)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setData(result.data)
                } else {
                    Alert.alert('Data not found')
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }
    const getCategory = () => {
        const myHeaders = new Headers();


        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };


        fetch(BASE_URL+"get_product_type", requestOptions)
            .then(response => response.json())
            .then(result => setCategory(result.data))
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }

    useEffect(() => {
        getFlexImg();
        getBanner();
        getCategory();

    }, [1500])
    const renderItem = ({ item }) => (
        <TouchableOpacity style={[styles.cBox]} key={item.id} onPress={() => { navigation.navigate('SubCat', { item }) }}>

            <View style={{ width: '100%', height: '70%'}}>
                <Image
                    resizeMode='contain'
                    source={{ uri: item.image }}
                    style={[styles.icons]}
                />
            </View>
            <Text style={{ marginVertical: 6, textAlign: 'center', fontSize: 11 }}>{item.product_type}</Text>
        </TouchableOpacity>
    )
    
    return (

        <View style={styles.bodyContainer}>
            <TouchableOpacity style={[styles.DisBox, styles.shadow]} >
                <View style={styles.disText}>
                    <Text style={{ ...FONTS.h3 }}>Welcom to </Text>
                    <Text style={{ ...FONTS.h2, fontWeight: 'bold' }}>Bhanu Mart</Text>
                    <Text style={{ ...FONTS.h3 }}>Best Store for All </Text>
                </View>
                <View style={styles.hImContainer}>
                    <Image
                        source={require('../../assets/images/Bhanu.png')}
                        resizeMode='contain'
                        style={styles.hedImage}
                    />
                </View>
            </TouchableOpacity>
            {isLoading ? <ActivityIndicator size="large" color="orange" /> : 
                        <TouchableOpacity style={styles.flexContainer} onPress={() => { navigation.navigate('SubCat', { item:banner }) }} key={index}>
                <Image
                    source={{ uri: banner?.image }}
                    resizeMode='cover'
                    style={{ ...StyleSheet.absoluteFill,width: '100%', height: '100%', borderRadius: SIZES.base,alignSelf:'center'}}
                />
               
            </TouchableOpacity>
                  }
           
            <View style={[styles.boXShadow, { flex: 1, backgroundColor: '#ffece6', borderRadius: SIZES.base, margin:Platform.OS==='ios'?8:5 }]}>
                <Text style={{ ...FONTS.h3, color: COLORS.black, paddingVertical: SIZES.base, fontWeight: 'bold', paddingLeft: SIZES.radius, textTransform: 'uppercase' }}>Shop By Category</Text>
                {isLoading ? <ActivityIndicator size="large" color="orange" /> : <FlatList
                    data={category}
                    numColumns={3}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                />}
            </View>
            <View style={[styles.flexContainer, { marginHorizontal: 5 }]}>

                    <SwiperFlatList                        
                        showPagination
                        paginationStyleItem={{height:10,width:10,borderRadius:5}}
                        snapToAlignment='center'
                        snapToInterval={SIZES.width}
                        data={data}
                        renderItem={({ item,index }) => (
                            <TouchableOpacity style={{
                                width:SIZES.width,
                                alignItems:'center',
                                justifyContent:'center'
                            }} onPress={() => navigation.navigate('SubCategory',{item})} key={index}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={{
                                        width: '95%',
                                        height: '95%',
                                        flex:1,
                                        alignSelf:'center'
                                    }}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    DisBox: {
        flex: 1,
        margin: Platform.OS==='ios'?10:5,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.base,
        borderRadius: 10
    },
    shadow: {
        shadowColor: COLORS.bgcolor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.45,
        shadowRadius: 3.85,
        elevation: 5
    },
    disText: {
        flex: 1,
        padding: 6
    },
    hImContainer: {
        width: 120,
        height: 90,
    },
    hedImage: {
        width: '100%',
        height: '100%'
    },
    flexContainer: {
        flex: 1,
        height:SIZES.height * 0.25,
        maxHeight: SIZES.height * 0.25,
        marginVertical: 8,
        borderRadius: SIZES.base,
        margin:Platform.OS==='ios'?8:5,
        alignItems: 'center',
        elevation: 10,
        backgroundColor:COLORS.white
    },
    flexContainer1: {
        flex: 1,
        maxHeight: SIZES.height * 0.28,
        marginVertical: 8,
        borderRadius: SIZES.base,
        margin: 5,
        alignItems: 'center',
        elevation: 10
    },
    cBox: {
        flex: 1,
        margin: 1,
        height: SIZES.height * 0.18,
        maxWidth: SIZES.width * 0.32,
        backgroundColor: COLORS.white,
    },
    iconBox: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    icons: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    bannerImage: {
        width: '100%',
        height: SIZES.height / 5.5
    },
    titileBox: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingHorizontal: 10
    },
    child: {
        width: SIZES.width,
        justifyContent: 'center',
        alignSelf:'center'
    },
});

//make this component available to the app
export default Banner;
