//import liraries
import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView, ScrollView,
    FlatList, Image, ImageBackground, Platform,ToastAndroid
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import HeaderBar from './../../components/HeaderBar/index';
import { Ionicons, MaterialIcons, FontAwesome } from 'react-native-vector-icons'
import { useSelector } from 'react-redux'

import { showMessage } from "react-native-flash-message";
import { TabRouter, useIsFocused } from '@react-navigation/native'
import { Picker as SelectPicker } from '@react-native-picker/picker'
import ShoppingCartIcon from '../../components/ShoppingCartIcon';
import { BASE_URL } from './../../Base';
const RecoList = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [qty, setQty] = useState(1);
    const [category, setCategory] = useState([]);
    const [data, setData] = useState([])
    const [allPress, setAllPress] = useState(true);
    const [selectedValue, setSelectedValue] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [cartCount, setCartCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const userInfo = useSelector(state => state.users)
    const isFocused = useIsFocused();

    const showToastWithGravity = (msg) => {
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };
    const getCartProduct = () => {
        const myHeaderscar = new Headers();


        const formdatacar = new FormData();
        formdatacar.append("user_id", userInfo);

        const requestOptionscar = {
            method: 'POST',
            headers: myHeaderscar,
            body: formdatacar,
            redirect: 'follow'
        };

        fetch(BASE_URL+"get_cart_detail", requestOptionscar)
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.responce === true) {
                    setCartCount(responseJson.data.length)
                } else {
                    setCartCount(0)
                }
            })
            .catch((error) => console.error(error));
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
    const getproduct = (id) => {
        const myHeadersp = new Headers();

        const formdatap = new FormData();
        formdatap.append("type", "product_type");
        formdatap.append("id", id || '');

        const requestOptionsp = {
            method: 'POST',
            headers: myHeadersp,
            body: formdatap,
            redirect: 'follow'
        };

        fetch(BASE_URL+"get_filtered_product", requestOptionsp)
            .then(response => response.json())
            .then(result => setData(result.data))
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }

    const onSnack = (id) => {
        getproduct(id);
        setSelectedCategory(id)
        setAllPress(false);
    };

    const onAll = () => {
        getproduct(id = 0);
        setSelectedCategory(null)
        setAllPress(true);

    };
    const add_cart = (item) => {
        if (item.id === selectedValue.product_id) {
            const myHeadersadd = new Headers();
            const formdataadd = new FormData();
            formdataadd.append("user_id", userInfo);
            formdataadd.append("product_id", item.id);
            formdataadd.append("product_name", item.product_name);
            formdataadd.append("price", item.varients[0].sale_price);
            formdataadd.append("qty", qty);
            formdataadd.append("variant_id", selectedValue.id);


            const requestOptionsadd = {
                method: 'POST',
                headers: myHeadersadd,
                body: formdataadd,
                redirect: 'follow'
            };

            fetch(BASE_URL+"add_to_cart", requestOptionsadd)
                .then(response => response.json())
                .then((responseJson) => {
                    if (responseJson.responce === true) {
                        if(Platform.OS==='android'){
                            showToastWithGravity('Added to Cart')
                        }else{
                            showMessage({
                                message: responseJson.massage,
                                type: "success",
                            });
                        }                       
                        getCartProduct();
                    } else {
                        setErrortext(responseJson.massage);
                        Alert.alert(responseJson.massage);
                    }
                })
                .catch(error => console.log('error', error));
        } else {
            const myHeadersadd = new Headers();
            const formdataadd = new FormData();
            formdataadd.append("user_id", userInfo);
            formdataadd.append("product_id", item.id);
            formdataadd.append("product_name", item.product_name);
            formdataadd.append("price", item.varients[0].sale_price);
            formdataadd.append("qty", qty);
            formdataadd.append("variant_id", item.varients[0].id);


            const requestOptionsadd = {
                method: 'POST',
                headers: myHeadersadd,
                body: formdataadd,
                redirect: 'follow'
            };

            fetch(BASE_URL+"add_to_cart", requestOptionsadd)
                .then(response => response.json())
                .then((responseJson) => {
                    if (responseJson.responce === true) {
                        if(Platform.OS==='android'){
                            showToastWithGravity('Added to Cart')
                        }else{
                            showMessage({
                                message: responseJson.massage,
                                type: "success",
                            });
                        }
                        getCartProduct();
                    } else {
                        setErrortext(responseJson.massage);
                        Alert.alert(responseJson.massage);
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    useEffect(() => {

        getCategory();
        getproduct();
        getCartProduct();
        const unsubscribe = navigation.addListener('focus', () => {
            getCategory();
            getproduct();
            getCartProduct();
        });
        return unsubscribe;
    }, [isFocused,navigation]);

    const renderItem = ({ item }) => (
        <View key={item.id}>
            <View style={styles.containerbo} >
                <View style={styles.left}>
                    <TouchableOpacity style={[styles.imgBox, styles.shadow]}
                        onPress={() => navigation.navigate('ProductDetail', { item })}>
                        {
                            item.stock_status === '0' ?
                                <View>
                                    {
                                        item.varients.length < 2 ?
                                            <View>
                                                {
                                                    item.varients[0].image.slice(0, 1).map(item => (
                                                        <View>
                                                            {
                                                                item !== '' || undefined ?
                                                                    <ImageBackground source={{ uri: item.mi }} resizeMode='contain' style={styles.image}>
                                                                        <View style={styles.text}>
                                                                            <Text style={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center', transform: [{ rotate: '315deg' }], fontSize: 16 }}>Out of Stock</Text>
                                                                        </View>
                                                                        <View style={{
                                                                            flex: 1, width: 100, alignItems: 'center', flexDirection: 'row',
                                                                            transform: [{ rotate: '270deg' }], position: 'absolute',
                                                                            left: -40, zIndex: 100,
                                                                            top: Platform.OS === 'android' ? 42 : 40, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                                        }}>

                                                                            <Text style={{ backgroundColor: COLORS.bgcolor, paddingHorizontal: 8, color: COLORS.white, fontWeight: 'bold' }}>BM Assured</Text>
                                                                        </View>
                                                                    </ImageBackground> :

                                                                    <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }} resizeMode='contain' style={styles.image}>
                                                                        <View style={styles.text}>
                                                                            <Text style={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center', transform: [{ rotate: '315deg' }], fontSize: 16 }}>Out of Stock</Text>
                                                                        </View>
                                                                        <View style={{
                                                                            flex: 1, width: 100, alignItems: 'center', flexDirection: 'row',
                                                                            transform: [{ rotate: '270deg' }], position: 'absolute',
                                                                            left: -40, zIndex: 100,
                                                                            top: Platform.OS === 'android' ? 42 : 40, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                                        }}>

                                                                            <Text style={{ backgroundColor: COLORS.bgcolor, paddingHorizontal: 8, color: COLORS.white, fontWeight: 'bold' }}>BM Assured</Text>
                                                                        </View>
                                                                    </ImageBackground>
                                                            }
                                                        </View>
                                                    ))
                                                }
                                            </View> :
                                            <View>
                                                {
                                                    selectedValue.product_id === item.id ?
                                                        <View>
                                                            {
                                                                selectedValue.image.slice(0, 1).map(item => (
                                                                    <View>
                                                                        {
                                                                            item !== '' || undefined ?

                                                                                <ImageBackground source={{ uri: item.mi }} resizeMode='contain' style={styles.image}>
                                                                                    <View style={styles.text}>
                                                                                        <Text style={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center', transform: [{ rotate: '315deg' }], fontSize: 16 }}>Out of Stock</Text>
                                                                                    </View>
                                                                                    <View style={{
                                                                                        flex: 1, width: 100, alignItems: 'center', flexDirection: 'row',
                                                                                        transform: [{ rotate: '270deg' }], position: 'absolute',
                                                                                        left: -40, zIndex: 100,
                                                                                        top: Platform.OS === 'android' ? 42 : 40, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                                                    }}>

                                                                                        <Text style={{ backgroundColor: COLORS.bgcolor, paddingHorizontal: 8, color: COLORS.white, fontWeight: 'bold' }}>BM Assured</Text>
                                                                                    </View>
                                                                                </ImageBackground> :

                                                                                <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }} resizeMode='contain' style={styles.image}>
                                                                                    <View style={styles.text}>
                                                                                        <Text style={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center', transform: [{ rotate: '315deg' }], fontSize: 16 }}>Out of Stock</Text>
                                                                                    </View>
                                                                                    <View style={{
                                                                                        flex: 1, width: 100, alignItems: 'center', flexDirection: 'row',
                                                                                        transform: [{ rotate: '270deg' }], position: 'absolute',
                                                                                        left: -40, zIndex: 100,
                                                                                        top: Platform.OS === 'android' ? 42 : 40, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                                                    }}>

                                                                                        <Text style={{ backgroundColor: COLORS.bgcolor, paddingHorizontal: 8, color: COLORS.white, fontWeight: 'bold' }}>BM Assured</Text>
                                                                                    </View>
                                                                                </ImageBackground>
                                                                        }
                                                                    </View>

                                                                ))
                                                            }
                                                        </View>
                                                        :
                                                        <View>
                                                            {
                                                                item.varients[0].image.slice(0, 1).map(item => (
                                                                    <View>
                                                                        {
                                                                            item !== '' || undefined ?
                                                                                <ImageBackground source={{ uri: item.mi }} resizeMode='contain' style={styles.image}>
                                                                                    <View style={styles.text}>
                                                                                        <Text style={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center', transform: [{ rotate: '315deg' }], fontSize: 16 }}>Out of Stock</Text>
                                                                                    </View>
                                                                                    <View style={{
                                                                                        flex: 1, width: 100, alignItems: 'center', flexDirection: 'row',
                                                                                        transform: [{ rotate: '270deg' }], position: 'absolute',
                                                                                        left: -40, zIndex: 100,
                                                                                        top: Platform.OS === 'android' ? 42 : 40, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                                                    }}>

                                                                                        <Text style={{ backgroundColor: COLORS.bgcolor, paddingHorizontal: 8, color: COLORS.white, fontWeight: 'bold' }}>BM Assured</Text>
                                                                                    </View>
                                                                                </ImageBackground>
                                                                                :

                                                                                <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }} resizeMode='contain' style={styles.image}>
                                                                                    <View style={styles.text}>
                                                                                        <Text style={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center', transform: [{ rotate: '315deg' }], fontSize: 16 }}>Out of Stock</Text>
                                                                                    </View>
                                                                                    <View style={{
                                                                                        flex: 1, width: 100, alignItems: 'center', flexDirection: 'row',
                                                                                        transform: [{ rotate: '270deg' }], position: 'absolute',
                                                                                        left: -40, zIndex: 100,
                                                                                        top: Platform.OS === 'android' ? 42 : 40, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                                                    }}>

                                                                                        <Text style={{ backgroundColor: COLORS.bgcolor, paddingHorizontal: 8, color: COLORS.white, fontWeight: 'bold' }}>BM Assured</Text>
                                                                                    </View>
                                                                                </ImageBackground>
                                                                        }
                                                                    </View>
                                                                ))
                                                            }
                                                        </View>
                                                }
                                            </View>
                                    }
                                </View> :
                                <View >
                                    {
                                        item.varients.length < 2 ?
                                            <View>
                                                {
                                                    item.varients[0].image.slice(0, 1).map(item => (
                                                        <View style={[styles.imgBox, styles.shadow]}>
                                                            {
                                                                item !== '' || undefined ?
                                                                    <ImageBackground source={{ uri: item.mi }} resizeMode='contain' style={styles.image}>

                                                                        <View style={{
                                                                            flex: 1, width: 100, alignItems: 'center', flexDirection: 'row',
                                                                            transform: [{ rotate: '270deg' }], position: 'absolute',
                                                                            left: -40, zIndex: 100,
                                                                            top: Platform.OS === 'android' ? 42 : 40, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                                        }}>

                                                                            <Text style={{ backgroundColor: COLORS.bgcolor, paddingHorizontal: 8, color: COLORS.white, fontWeight: 'bold' }}>BM Assured</Text>
                                                                        </View>
                                                                    </ImageBackground>
                                                                    :
                                                                    <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }} resizeMode='contain' style={styles.image}>

                                                                        <View style={{
                                                                            flex: 1, width: 100, alignItems: 'center', flexDirection: 'row',
                                                                            transform: [{ rotate: '270deg' }], position: 'absolute',
                                                                            left: -40, zIndex: 100,
                                                                            top: Platform.OS === 'android' ? 42 : 40, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                                        }}>

                                                                            <Text style={{ backgroundColor: COLORS.bgcolor, paddingHorizontal: 8, color: COLORS.white, fontWeight: 'bold' }}>BM Assured</Text>
                                                                        </View>
                                                                    </ImageBackground>

                                                            }
                                                        </View>
                                                    ))
                                                }
                                            </View> :
                                            <View>
                                                {
                                                    selectedValue.product_id === item.id ?
                                                        <View>
                                                            {
                                                                selectedValue.image.slice(0, 1).map(item => (
                                                                    <View style={[styles.imgBox, styles.shadow]}>
                                                                        {
                                                                            item !== '' || undefined ?
                                                                                <ImageBackground source={{ uri: item.mi }} resizeMode='contain' style={styles.image}>

                                                                                    <View style={{
                                                                                        flex: 1, width: 100, alignItems: 'center', flexDirection: 'row',
                                                                                        transform: [{ rotate: '270deg' }], position: 'absolute',
                                                                                        left: -40, zIndex: 100,
                                                                                        top: Platform.OS === 'android' ? 42 : 40, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                                                    }}>

                                                                                        <Text style={{ backgroundColor: COLORS.bgcolor, paddingHorizontal: 8, color: COLORS.white, fontWeight: 'bold' }}>BM Assured</Text>
                                                                                    </View>
                                                                                </ImageBackground>
                                                                                :
                                                                                <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }} resizeMode='contain' style={styles.image}>

                                                                                    <View style={{
                                                                                        flex: 1, width: 100, alignItems: 'center', flexDirection: 'row',
                                                                                        transform: [{ rotate: '270deg' }], position: 'absolute',
                                                                                        left: -40, zIndex: 100,
                                                                                        top: Platform.OS === 'android' ? 42 : 40, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                                                    }}>

                                                                                        <Text style={{ backgroundColor: COLORS.bgcolor, paddingHorizontal: 8, color: COLORS.white, fontWeight: 'bold' }}>BM Assured</Text>
                                                                                    </View>
                                                                                </ImageBackground>
                                                                        }
                                                                    </View>

                                                                ))
                                                            }
                                                        </View>
                                                        :
                                                        <View>
                                                            {
                                                                item.varients[0].image.slice(0, 1).map(item => (
                                                                    <View style={[styles.imgBox, styles.shadow]}>
                                                                        {
                                                                            item !== '' || undefined ?
                                                                                <ImageBackground source={{ uri: item.mi }} resizeMode='contain' style={styles.image}>

                                                                                    <View style={{
                                                                                        flex: 1, width: 100, alignItems: 'center', flexDirection: 'row',
                                                                                        transform: [{ rotate: '270deg' }], position: 'absolute',
                                                                                        left: -40, zIndex: 100,
                                                                                        top: Platform.OS === 'android' ? 42 : 40, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                                                    }}>

                                                                                        <Text style={{ backgroundColor: COLORS.bgcolor, paddingHorizontal: 8, color: COLORS.white, fontWeight: 'bold' }}>BM Assured</Text>
                                                                                    </View>
                                                                                </ImageBackground>
                                                                                :
                                                                                <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }} resizeMode='contain' style={styles.image}>

                                                                                    <View style={{
                                                                                        flex: 1, width: 100, alignItems: 'center', flexDirection: 'row',
                                                                                        transform: [{ rotate: '270deg' }], position: 'absolute',
                                                                                        left: -40, zIndex: 100,
                                                                                        top: Platform.OS === 'android' ? 42 : 40, borderTopLeftRadius: 5, borderTopRightRadius: 5
                                                                                    }}>

                                                                                        <Text style={{ backgroundColor: COLORS.bgcolor, paddingHorizontal: 8, color: COLORS.white, fontWeight: 'bold' }}>BM Assured</Text>
                                                                                    </View>
                                                                                </ImageBackground>
                                                                        }
                                                                    </View>
                                                                ))
                                                            }
                                                        </View>
                                                }
                                            </View>
                                    }
                                </View>
                        }

                    </TouchableOpacity>

                </View>

                <View style={styles.right}>
                    <Text style={{ ...FONTS.h3, fontWeight: 'bold', color: COLORS.black, paddingVertical: 6 }}>{item.product_name}</Text>
                    {
                        item.rating ? <Text style={{ padding: SIZES.base * 0.06, backgroundColor: '#ffece6', width: 40, borderRadius: SIZES.base, textAlign: 'center', fontSize: 12, color: COLORS.bgcolor }}>{item.rating || 0}{' '}<Ionicons name='star' size={SIZES.body4} color={COLORS.bgcolor} /></Text> : <View />
                    }
                    {
                        item.varients.length < 2 ? <View key={item.varients[0].id}>

                            <Text style={{ padding: 4, height: 30, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 3, marginVertical: 4, paddingLeft: 12, fontWeight: '500' }}>{item.varients[0].size}</Text>
                            <View style={{ flexDirection: 'row', padding: SIZES.base, alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ paddingHorizontal: 8, fontWeight: 'bold', fontSize: 14 }}>
                                        <FontAwesome name='rupee' color={COLORS.black} size={12} />
                                        {item.varients[0].sale_price}
                                    </Text>
                                    <Text style={{ textDecorationLine: 'line-through', fontSize: 12, color: '#808080' }}>
                                        <FontAwesome name='rupee' color='#808080' size={10} />
                                        {item.varients[0].product_price}
                                    </Text>
                                    {
                                        (Number(item.varients[0].discount)) < 1 ? <View /> :
                                            <View style={{ backgroundColor: COLORS.bgcolor, padding: 0.5, paddingHorizontal: 5, marginLeft: Platform.OS === 'android' ? 10 : 5 }}>
                                                <Text style={{ color: COLORS.white, fontSize: Platform.OS === 'android' ? SIZES.radius : 10, fontWeight: 'bold' }}>{item.varients[0].discount}% OFF </Text>
                                            </View>
                                    }
                                </View>
                            </View>
                            {

item.stock_status === '0' ? <Text style={styles.ostock}>Out of Stock</Text> : <TouchableOpacity
    style={{
         height: 30,width:80,
        borderRadius: 10, justifyContent: 'center',
        alignItems: 'center', backgroundColor: COLORS.bgcolor,
        marginRight: Platform.OS === 'android' ? 10 : 15,
        marginBottom:3
    }}
    onPress={() => { add_cart(item) }}
>
    <Text style={{color:COLORS.white,fontWeight:'bold'}}>Add</Text>
</TouchableOpacity>
}

                        </View>
                            :
                            <View key={item.id}>
                                {
                                    Platform.OS === 'android' ?
                                        <View style={{ height: 30, marginHorizontal: 5, paddingLeft: 10, borderWidth: 1, borderColor: COLORS.gray, borderRadius: 10 }} key={item.id}>
                                            <SelectPicker
                                                selectedValue={selectedValue}
                                                style={{ height: 30, borderWidth: 1, paddingLeft: Platform.OS === 'android' ? 10 : 0, borderColor: COLORS.bgcolor, borderRadius: 10 }}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    setSelectedValue(itemValue)
                                                }>
                                                {
                                                    item.varients.filter(e => e.product_id === item.id).map(item => (<SelectPicker.Item label={item.size} value={item} key={item.id} />))
                                                }

                                            </SelectPicker>

                                        </View> :
                                        <View>
                                            {
                                                selectedValue.product_id === item.id ? <Text style={{
                                                    fontSize: 15, fontWeight: 'bold', marginBottom: 5, backgroundColor: COLORS.lightGray,
                                                    paddingVertical: 3, width: '50%', textAlign: 'center'
                                                }}>{selectedValue.size}</Text> :
                                                    <Text style={{
                                                        fontSize: 15, fontWeight: 'bold', marginBottom: 5, backgroundColor: COLORS.lightGray,
                                                        paddingVertical: 3, width: '50%', textAlign: 'center'
                                                    }}>{item.varients[0].size}</Text>
                                            }

                                            <Text style={{ fontSize: 14, fontWeight: '700', marginBottom: 5, textAlign: 'center' }}>Select Quantity here</Text>
                                            <View style={{ height: 30, marginHorizontal: 5, borderRadius: 10 }} key={item.id}>
                                                <SelectPicker
                                                    selectedValue={selectedValue}
                                                    itemStyle={{ height: 30, flex: 1, fontWeight: 'bold', fontSize: 12 }}
                                                    style={{ height: 30, borderRadius: 10 }}
                                                    onValueChange={(itemValue, itemIndex) =>
                                                        setSelectedValue(itemValue)
                                                    }>
                                                    {
                                                        item.varients.filter(e => e.product_id === item.id).map(item => (<SelectPicker.Item label={item.size} value={item} key={item.id} />))
                                                    }

                                                </SelectPicker>

                                            </View>
                                        </View>

                                }
                                {
                                    selectedValue.product_id === item.id ?
                                        <View style={{ flexDirection: 'row', padding: SIZES.base, alignItems: 'center', justifyContent: 'space-between' }} key={item.id}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ paddingHorizontal: 8, fontWeight: 'bold', fontSize: 14 }}>
                                                    <FontAwesome name='rupee' color={COLORS.black} size={12} />
                                                    {selectedValue.sale_price}
                                                </Text>
                                                <Text style={{ textDecorationLine: 'line-through', fontSize: 12, color: '#808080' }}>
                                                    <FontAwesome name='rupee' color='#808080' size={10} />
                                                    {selectedValue.product_price}
                                                </Text>
                                                {
                                                    (Number(selectedValue.discount)) < 1 ? <View /> :
                                                        <View style={{ backgroundColor: COLORS.bgcolor, padding: 0.5, paddingHorizontal: Platform.OS === 'android' ? 5 : 0, marginLeft: Platform.OS === 'android' ? 10 : 5 }}>
                                                            <Text style={{ color: COLORS.white, fontSize: Platform.OS === 'android' ? SIZES.radius : 10, fontWeight: 'bold' }}>{selectedValue.discount}% OFF </Text>
                                                        </View>
                                                }
                                            </View>
                                           

                                        </View> :
                                        <View style={{ flexDirection: 'row', padding: SIZES.base, alignItems: 'center', justifyContent: 'space-between' }} key={item.id}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ paddingHorizontal: 8, fontWeight: 'bold', fontSize: 14 }}>
                                                    <FontAwesome name='rupee' color={COLORS.black} size={12} />
                                                    {item.varients[0].sale_price}
                                                </Text>
                                                <Text style={{ textDecorationLine: 'line-through', fontSize: 12, color: '#808080' }}>
                                                    <FontAwesome name='rupee' color='#808080' size={10} />
                                                    {item.varients[0].product_price}
                                                </Text>
                                                {
                                                    (Number(item.varients[0].discount)) < 1 ? <View /> :
                                                        <View style={{ backgroundColor: COLORS.bgcolor, padding: 0.5, paddingHorizontal: 5, marginLeft: 10 }}><Text style={{ color: COLORS.white, fontSize: SIZES.radius, fontWeight: 'bold' }}>{item.varients[0].discount}% OFF </Text>
                                                        </View>
                                                }
                                            </View>
                                           

                                        </View>
                                        
                                }

                                {

item.stock_status === '0' ? <Text style={styles.ostock}>Out of Stock</Text> :
    <TouchableOpacity
        style={{
            width: 80, height: 30,
            borderRadius: 10, justifyContent: 'center',
            alignItems: 'center', backgroundColor: COLORS.bgcolor,
            marginRight: 10
        }}
        onPress={() => { add_cart(item) }}
    >
        <Text style={{color:COLORS.white,fontWeight:'bold'}}>Add</Text>
    </TouchableOpacity>}

                            </View>
                    }

                </View>
            </View>

            <View style={styles.seperator} />
        </View>
    )
    function renderBody() {
        return (
            <View style={styles.htcontainer}>
                <FlatList
                    data={data}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ justifyContent: 'space-between' }}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={{ marginTop: 40, flex: 1 }}>

            <HeaderBar titleText='Recommendation List' onPress={() => navigation.goBack()} />
            {isLoading ? <ActivityIndicator size="large" color="orange" /> : <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingVertical: 1, paddingHorizontal: 10, paddingRight: 20, maxHeight: 40, width: '100%', marginTop: -15 }}>
                <TouchableOpacity style={[styles.shadow, styles.box, { borderColor: allPress ? COLORS.bgcolor : COLORS.gray }]} onPress={onAll}>
                    <Text style={styles.textB, { color: allPress ? COLORS.bgcolor : COLORS.gray }}>All</Text>
                </TouchableOpacity>
                {
                    category?.map((item, index) => (
                        <TouchableOpacity style={[styles.shadow, styles.box, { borderColor: (selectedCategory === item.id) ? COLORS.bgcolor : COLORS.gray, marginRight: index == category.length - 1 ? 20 : 2 }]} onPress={() => onSnack(item.id)} key={index}>
                            <Text style={[styles.textB, { color: (selectedCategory === item.id) ? COLORS.bgcolor : COLORS.gray }]}>{item.product_type}</Text>
                        </TouchableOpacity>

                    ))
                }
            </ScrollView>}
            <ScrollView style={styles.container}>
                {renderBody()}
            </ScrollView>
            <View style={{ position: 'absolute', top: 10, right: 10, alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 30 }}>
                <ShoppingCartIcon cartCount={cartCount} />
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    htcontainer: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    ostock: {
        color: COLORS.bgcolor, fontWeight: 'bold',
        backgroundColor: COLORS.lightGray,
        borderRadius: 2,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginBottom:3,
        marginRight:15,
        textAlign:'center'
    },
    text: {
        color: COLORS.bgcolor,
        fontSize: 18,
        lineHeight: 90,
        paddingTop: 10,
        fontWeight: "bold",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.41)',
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    box: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray, borderRadius: SIZES.base,
        marginHorizontal: 2,
        height: 30, justifyContent: 'center',
        alignItems: 'center', paddingHorizontal: 15
    },
    boxs: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SIZES.base,
        marginHorizontal: 6,
        height: 30, justifyContent: 'center',
        alignItems: 'center', paddingHorizontal: 15
    },
    textB: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.gray
    },
    textBs: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.gray
    },
    containerbo: {
        flex: 1,
        flexDirection: 'row',
        padding: 3,
        marginTop: -6
    },
    left: {
        width: 140,
        padding: 10,
        paddingTop: 20
    },
    imgBox: {
        width: 120,
        height: 110,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        alignItems:'center',
        justifyContent:'center'
    },
    image: 
        { 
            width: '100%', height: '96%', 
            borderRadius: SIZES.base, alignItems: 'center',
             justifyContent: 'center',alignSelf:'center'
            },
    
    right: {
        flex: 1,
        padding: 4
    },
    seperator: {
        width: '100%',
        height: 1,
        backgroundColor: COLORS.bgcolor,
        marginTop: -6
    },
    shadow: {
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.35,
        shadowRadius: 4.35,
        elevation: 5
    }
});

//make this component available to the app
export default RecoList;
