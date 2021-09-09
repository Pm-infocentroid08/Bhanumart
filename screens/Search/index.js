//import liraries
import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList,
    Image, ActivityIndicator, ToastAndroid, ImageBackground, Platform
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import HeaderBar from './../../components/HeaderBar/index';
import { Ionicons, MaterialIcons, FontAwesome } from 'react-native-vector-icons'
import { showMessage } from "react-native-flash-message";
import { useSelector } from 'react-redux'

import { Picker as SelectPicker } from '@react-native-picker/picker'
import ShoppingCartIcon from '../../components/ShoppingCartIcon';
import { BASE_URL } from './../../Base';
// create a component
const SearchPage = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [qty, setQty] = useState(1);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const userInfo = useSelector(state => state.users)
    const [selectedValue, setSelectedValue] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const showToastWithGravity = (msg) => {
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };
    const getProduct = () => {
        const myHeadersp = new Headers();
        const formdatap = new FormData();
        formdatap.append("product_type_id", "");
        formdatap.append("category_id", "");
        formdatap.append("subcategory_id", "");

        const requestOptionsp = {
            method: 'POST',
            headers: myHeadersp,
            body: formdatap,
            redirect: 'follow'
        };
        fetch(BASE_URL+"get_product", requestOptionsp)
            .then(response => response.json())
            .then(result => { setFilteredDataSource(result.data), setMasterDataSource(result.data) })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }
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
    useEffect(() => {
        getProduct();
        getCartProduct();
    }, [navigation]);
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
                        if(Platform.OS==='ios'){
                            showMessage({
                                message: responseJson.massage,
                                type: "success",
                            });
                        }else{
                            showToastWithGravity('Added to Cart');
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
                        if(Platform.OS==='ios'){
                            showMessage({
                                message: responseJson.massage,
                                type: "success",
                            });
                        }else{
                            showToastWithGravity('Added to Cart');
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


    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                // Applying filter for the inserted text in search bar
                const itemData = item.product_name
                    ? item.product_name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };
    const ItemView = ({ item }) => {
        return (
            <View>
                <View style={styles.containerItem} >
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
                                                                        <ImageBackground source={{ uri: item.mi }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                                                                            <View style={styles.text}>
                                                                                <Text style={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center', transform: [{ rotate: '315deg' }], fontSize: 16 }}>Out of Stock</Text>
                                                                            </View>
                                                                        </ImageBackground> :

                                                                        <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                                                                            <View style={styles.text}>
                                                                                <Text style={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center', transform: [{ rotate: '315deg' }], fontSize: 16 }}>Out of Stock</Text>
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

                                                                                    <ImageBackground source={{ uri: item.mi }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                                                                                        <View style={styles.text}>
                                                                                            <Text style={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center', transform: [{ rotate: '315deg' }], fontSize: 16 }}>Out of Stock</Text>
                                                                                        </View>
                                                                                    </ImageBackground> :

                                                                                    <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                                                                                        <View style={styles.text}>
                                                                                            <Text style={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center', transform: [{ rotate: '315deg' }], fontSize: 16 }}>Out of Stock</Text>
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
                                                                                    <ImageBackground source={{ uri: item.mi }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                                                                                        <View style={styles.text}>
                                                                                            <Text style={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center', transform: [{ rotate: '315deg' }], fontSize: 16 }}>Out of Stock</Text>
                                                                                        </View>
                                                                                    </ImageBackground>
                                                                                    :

                                                                                    <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                                                                                        <View style={styles.text}>
                                                                                            <Text style={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center', transform: [{ rotate: '315deg' }], fontSize: 16 }}>Out of Stock</Text>
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
                                                                        <Image
                                                                            source={{ uri: item.mi }}
                                                                            resizeMode='contain'
                                                                            style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                                        /> :
                                                                        <Image
                                                                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }}
                                                                            resizeMode='contain'
                                                                            style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                                        />
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
                                                                                    <Image
                                                                                        source={{ uri: item.mi }}
                                                                                        resizeMode='contain'
                                                                                        style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                                                    /> :
                                                                                    <Image
                                                                                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }}
                                                                                        resizeMode='contain'
                                                                                        style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                                                    />
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
                                                                                    <Image
                                                                                        source={{ uri: item.mi }}
                                                                                        resizeMode='contain'
                                                                                        style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                                                    /> :
                                                                                    <Image
                                                                                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }}
                                                                                        resizeMode='contain'
                                                                                        style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                                                    />
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
                        <Text style={{ ...FONTS.h2, fontWeight: 'bold', color: COLORS.black, paddingBottom: 6, marginTop: 4 }}>{item.product_name}</Text>
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
                                                <View style={{ backgroundColor: COLORS.bgcolor, padding: 0.5, paddingHorizontal: 5, marginLeft: 10 }}><Text style={{ color: COLORS.white, fontSize: SIZES.radius, fontWeight: 'bold' }}>{item.varients[0].discount}% OFF </Text>
                                                </View>
                                        }
                                    </View>


                                </View>
                                {

                                    item.stock_status === '0' ? <Text style={styles.ostock}>Out of Stock</Text> :
                                        <TouchableOpacity
                                            style={{
                                                height: 30, width: 80,
                                                borderRadius: 10, justifyContent: 'center',
                                                alignItems: 'center', backgroundColor: COLORS.bgcolor,
                                                marginRight: Platform.OS === 'android' ? 10 : 15,
                                                marginBottom: 3
                                            }}
                                            onPress={() => { add_cart(item) }}
                                        >
                                            <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Add</Text>
                                        </TouchableOpacity>}
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
                                                            <View style={{ backgroundColor: COLORS.bgcolor, padding: 0.5, paddingHorizontal: 5, marginLeft: 10 }}><Text style={{ color: COLORS.white, fontSize: SIZES.radius, fontWeight: 'bold' }}>{selectedValue.discount}% OFF </Text>
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
        <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Add</Text>
    </TouchableOpacity>}

                                </View>
                        }

                    </View>
                </View>
                <View style={styles.seperator} />
            </View>
        );
    };


    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };
    return (
        <View style={styles.container}>
            <HeaderBar titleText='Shop By Category' onPress={() => navigation.goBack()} />
            <View style={styles.SearchBox}>

                <Ionicons name='search' color={COLORS.gray} size={15} />

                <TextInput
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Search Here"
                    style={{
                        flex: 1,
                        height: '100%',
                        fontSize: 12,
                        marginLeft: 5
                    }}
                />
            </View>



            {search ? <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: SIZES.base, paddingHorizontal: SIZES.padding }}>
               {
                filteredDataSource ? <Text style={{ ...FONTS.body3, fontWeight: '700', color: COLORS.gray }}>We have found {filteredDataSource.length} results</Text>:
                <Text style={{ ...FONTS.body3, fontWeight: '700', color: COLORS.gray }}>We have found 0 results</Text>
               } 
            </TouchableOpacity> : <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: SIZES.base, paddingHorizontal: SIZES.padding }}>
            {
                filteredDataSource ? <Text style={{ ...FONTS.body3, fontWeight: '700', color: COLORS.gray }}>We have {filteredDataSource.length} Items</Text>:
                <Text style={{ ...FONTS.body3, fontWeight: '700', color: COLORS.gray }}>We have 0 Items</Text>
               } 
                
            </TouchableOpacity>}
            {isLoading ? <ActivityIndicator size="large" color="orange" /> : <FlatList
                data={filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
            />}
            <View style={{ position: 'absolute', top: 55, right: 10, alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 30 }}>
                <ShoppingCartIcon cartCount={cartCount} />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: SIZES.padding * 2,
        backgroundColor: COLORS.white,
    },
    itemStyle: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: SIZES.base, paddingHorizontal: SIZES.padding
    },
    ostock: {
        color: COLORS.bgcolor, fontWeight: 'bold',
        backgroundColor: COLORS.lightGray,
        borderRadius: 2,
        paddingHorizontal: 6,
        paddingVertical: 4, marginLeft: 10
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
    heBox: {
        height: 40,
        borderBottomWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray,
        justifyContent: 'center',
        paddingHorizontal: SIZES.radius,
        margin: 10
    },
    SearchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        height: 35,
        borderWidth: 1,
        marginTop: -15,
        borderColor: COLORS.bgcolor,
        marginHorizontal: 10,
        borderRadius: 5,
        paddingLeft: 15
    },
    iconBox: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    containerBox: {
        flex: 1,
        backgroundColor: COLORS.white,
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
    },
    imgBox: {
        width: 100,
        height: 90,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: SIZES.radius
    },
    left: {
        paddingTop: 22
    },
    right: {
        flex: 1,
        padding: 15,
        paddingLeft: 25,
        paddingTop: -5
    },
    seperator: {
        width: '100%',
        height: 1,
        backgroundColor: COLORS.bgcolor,
        marginTop: -10
    },
    containerItem: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 4,
        marginTop: -10
    },
});

//make this component available to the app
export default SearchPage;
