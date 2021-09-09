//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, RefreshControl, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import { FONTS, SIZES, COLORS } from '../../constants/index'
import HeaderBar from './../../components/HeaderBar/index';
import Button from './../../components/Container/Button';
import { Ionicons, FontAwesome } from 'react-native-vector-icons'
import { showMessage } from "react-native-flash-message";
import { useSelector } from 'react-redux'
import { BASE_URL } from './../../Base';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
// create a component
const Orders = ({ navigation }) => {
    const [order, setOrder] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    
    const userInfo = useSelector(state => state.users);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        getOrder();
    }, []);
    const getOrder = () => {
        const myHeaders = new Headers();
        const formdata = new FormData();
        formdata.append("user_id", userInfo);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL+"order_list", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setOrder(result.data)
                } else {
                    setOrder(0)
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));

    }

    const getStatus=(stats)=>{
        if(stats==='1'){
            return <Text style={{ color: COLORS.primary }}>Order Place</Text>;            
        }
        else if(stats==='2'){
            return <Text style={{ color: COLORS.primary }}>Order Recived</Text>;            
        }
        else if(stats==='3'){
            return <Text style={{ color: '#FFA500' }}>Order Prepared</Text>;            
        }
        else if(stats==='4'){
            return <Text style={{ color: '#FFA500' }}>Order Processed</Text>;            
        }
        else if(stats==='5'){
            return <Text style={{ color: 'green' }}>Order Shipped</Text>;            
        }
        else if(stats==='6'){
            return <Text style={{ color: 'green' }}>Order Delivered</Text>;            
        }
        else if(stats==='7'){
            return <Text style={{ color: COLORS.bgcolor }}>Order Canceled</Text>;            
        }
        else if(stats==='8'){
            return <Text style={{ color: COLORS.bgcolor }}>Payment Failed</Text>;            
        }

    }


    useEffect(() => {
        getOrder();
        const unsubscribe = navigation.addListener('focus', () => {
            getOrder()
        });
        return unsubscribe;

    }, [navigation])

    function renderBody() {
        const renderItem = ({ item }) => (
            <View>
                <TouchableOpacity style={styles.lisContainer} key={item.order_id}
                    onPress={() => navigation.navigate('OrderD', { item })}>
                    <View style={{ width: 50, height: 50 }}>
                        <Image
                            source={{ uri: 'https://cdn2.iconfinder.com/data/icons/e-commerce-line-4-1/1024/open_box4-512.png'}}
                            resizeMode='contain'
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 15, padding: 5 }}>
                        <Text>{item.txn_id}</Text>
                        <Text>Ordered On {' '}{item.order_date}</Text>
                        {getStatus(item.order_status )}

                    </View>

                    <TouchableOpacity style={{ width: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name='chevron-forward' color={COLORS.black} size={20} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        )
        return (
            <View style={styles.bodyContainer}>
                <HeaderBar titleText='My Orders' onPress={() => navigation.navigate('Home')} />
                {loading ? <ActivityIndicator size="large" color="orange" /> : <ScrollView style={styles.itemBox}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
                    {order.length !== undefined ? (<FlatList
                        data={order}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderItem}

                    />) : (
                        <View style={styles.emptyCartContainer}>
                            <Image
                                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWDkQ-8_HgHissWRpnjEnsC8_x0HLfnWsiGasFt8H8Y-4WBvOmmWzPhFOqbzQh6zeIYHg&usqp=CAU' }}
                                resizeMode='contain'
                                style={{
                                    width: '100%',
                                    height: 200
                                }}
                            />
                            <Text style={styles.emptyCartMessage}>Your Order List is empty !!!</Text>
                            <Button bText='Start Shopping' onPress={() => {
                                navigation.navigate('Home'),
                                    showMessage({
                                        message: "Let's Shop",
                                        description: "Let's Start Shopping 💕 ❤ ",
                                        type: "success",
                                    });
                            }} />
                        </View>
                    )}
                </ScrollView>}

            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderBody()}
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9'
    },
    bodyContainer: {
        flex: 1,
        paddingTop: SIZES.padding * 2,
        backgroundColor: COLORS.white
    },
    itemBox: {
        flex: 1,
        height: SIZES.height * 0.7,
        backgroundColor: '#f0f0f0'
    },
    lisContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        margin: 2,
        elevation: 10
    },
    hBox: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: 60,
        alignItems: 'center'
    },
    iconBox: {
        width: SIZES.padding * 1.8,
        height: SIZES.padding * 1.8,
        borderRadius: SIZES.padding * 0.9,
        backgroundColor: COLORS.black,
        marginRight: SIZES.padding,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartItem: {
        padding: 10,
        flexDirection: 'row',
        margin: 5,
        backgroundColor: COLORS.white,
        flex: 1
    },
    imageStyle: {
        width: 100,
        height: 100,
        borderRadius: SIZES.padding
    },
    textConteiner: {
        flex: 1,
        padding: 10,
        paddingLeft: 15
    },
    iconStyle: {
        width: 50,
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center'
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    emptyCartMessage: {
        ...FONTS.h1,
        paddingVertical: 15
    }
});

//make this component available to the app
export default Orders;
