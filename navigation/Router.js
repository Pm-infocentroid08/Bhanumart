import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ActivityIndicator, View } from 'react-native'
import { useSelector } from 'react-redux'
import {
    Home, Cart, CategoryPage, ContactUs,
    Faqs, Orders, Like, Profile, Legal, SubCategory,
    ProductDetail, ProductList, CheckOut, Invoice, SearchPage, RecoList, AddressPage,
    UserForm,
    MapData,
    Privacy,
    Wallet,
    AddMonney,
    Payment,
    MemberShip,
    Offers,
    Filters,
    CustomerCare,
    CallIng,
    Query,
    ProfileUpdate,
    SimilarProduct,
    Billing,
    AddressEdit,
    PlacedOrder,
    OrderDetails,
    ShopbyCategory,
    ProdImages,
    Rating,
    RatingS,
    CustomerReview,
    UpdateAddress,
    OnlinePay,
    PaymentStatus,
    MapDataView,
    EditAddress,
    MapDataEdit,
    CancelationPolicy,
    PrivacyPolicy,
    Notification
} from '../screens/index'
import { Ionicons, FontAwesome5 } from 'react-native-vector-icons'
import { COLORS } from '../constants/index'
import ShoppingCartIcon from '../components/ShoppingCartIcon';
import Upi from '../screens/Payment/Upi';
import Loader from '../screens/Auth/loader';
import SubProductList from '../screens/Category/SubCategory';
import { useNavigation } from '@react-navigation/native';
import MapHomeEdit from './../screens/MapData/MapEdit';
import BItem from './../screens/Home/BItem';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={BottomTab}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Category' component={ShopbyCategory}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='SubCategory' component={SubProductList}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Wallet' component={Wallet}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Cart' component={Cart}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Orders' component={Orders}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Faqs' component={Faqs}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Contact' component={ContactUs}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen name='AddMoney' component={AddMonney}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Payment' component={Payment}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Member' component={MemberShip}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Offers' component={Offers}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Legal' component={Legal}
                options={{
                    title: 'Terms & Condition',
                }}
            />
            <Stack.Screen name='Privacy' component={Privacy}
                options={{
                    title: 'Privacy',
                }}
            />
            <Stack.Screen name='SubCat' component={SubCategory}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='ProdList' component={ProductList}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='ProductDetail' component={ProductDetail}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Checkout' component={CheckOut}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Invoice' component={Invoice}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Profile' component={Profile}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Address' component={AddressPage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='UserForm' component={UserForm}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='MapView' component={MapData}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Filter' component={Filters}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Search' component={SearchPage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Query' component={Query}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='SimilarProd' component={SimilarProduct}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='CustomerCare' component={CustomerCare}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Billing' component={Billing}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Call' component={CallIng}
                options={{
                    title: 'Calling'
                }}
            />
            <Stack.Screen name='Eprofile' component={ProfileUpdate}
                options={{
                    title: 'Edit Profile'
                }}
            />
            <Stack.Screen name='Upi' component={Upi}
                options={{
                    title: 'Upi Payment'
                }}
            />
            <Stack.Screen name='AddEdt' component={AddressEdit}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='OrderP' component={PlacedOrder}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='OrderD' component={OrderDetails}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='PoodImage' component={ProdImages}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Rating' component={RatingS}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='VRComment' component={CustomerReview}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Wish' component={Like}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='UpAdd' component={UpdateAddress}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Paytm' component={OnlinePay}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Paytmstat' component={PaymentStatus}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='CurrentLo' component={MapDataView}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='EditAddr' component={EditAddress}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='MapEdt' component={MapDataEdit}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='MapHEdt' component={MapHomeEdit}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='CanPol' component={CancelationPolicy}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Notification' component={Notification}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='BItem' component={BItem}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}


const BottomTab = (props) => {
    return (

        <Tab.Navigator tabBarOptions={{
            activeTintColor: COLORS.primary,
            style: { justifyContent: 'center', alignItems: 'center' },
        }}>

            <Tab.Screen name='Home' component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='home' size={25} color={color} style={{ justifyContent: 'center', alignItems: 'center' }} />
                    ),
                    title: ''
                }}
            />
            <Tab.Screen name='AllCategory' component={Like}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='ios-heart' size={25} color={color} style={{ justifyContent: 'center', alignItems: 'center' }} />
                    ),
                    title: ''
                }}
            />

            <Tab.Screen name='Search' component={SearchPage}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name='search' size={25} color={color} style={{ justifyContent: 'center', alignItems: 'center' }} />
                    ),
                    title: ''
                }}
            />
            <Tab.Screen name='My List' component={RecoList}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name='clipboard-list' size={25} color={color} style={{ justifyContent: 'center', alignItems: 'center' }} />
                    ),
                    title: ''
                }}
            />
            <Tab.Screen name='User' component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name='user-alt' size={25} color={color} style={{ justifyContent: 'center', alignItems: 'center' }} />
                    ),
                    title: '',
                }}
            />

        </Tab.Navigator>

    )
}
export default Router;
