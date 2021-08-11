import React, { Component } from 'react'
import {View,Platform,TextInput,StyleSheet,Dimensions,Text,Pressable,Alert,TouchableWithoutFeedback,Image,KeyboardAvoidingView} from 'react-native'

import Entypo from 'react-native-vector-icons/Entypo'
import FormInput from './../../components/Form/FormInput';
import { COLORS, SIZES } from '../../constants';
import FormButton from '../../components/Form/FormButton';
import SocialButton from '../../components/Form/SocialButton';
import { showMessage } from "react-native-flash-message";
const shadowButtonStyle ={
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  };
export class Register extends Component {
    constructor(props){
        super(props);

        this.state={
            email:'',
            password:'',
            name:'',
        }
        this.onSignUp=this.onSignUp.bind(this);
    }
  
    onSignUp(){
        return Alert.alert('Signup')
    }
    

    render() {
        return (
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? SIZES.padding : SIZES.height}
             style={styles.container}>
             
                <Image
                        source={{uri:'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg'}}
                        resizeMode='contain'
                        style={styles.logo}
                    />
                <View style={styles.headerContainer}>
                    <Text style={styles.heading}>Create Account</Text>
                </View>
                <View style={{height:70}}>
                        <FormInput
                            placeholderText='Name'
                            onChangeText={(name)=>this.setState({name})}
                            iconType='user'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                </View>
                <View style={{height:70}}>
                        <FormInput
                            placeholderText='Email'
                            onChangeText={(email)=>this.setState({email})}
                            iconType='email'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                </View>
                <View style={{height:70}}>
                        <FormInput
                            placeholderText='Password'
                            onChangeText={(password)=>this.setState({password})}
                            iconType='lock'
                            secureTextEntry={true}
                        />
                </View>
                <FormButton 
                        titleText='Sign Out' 
                        iconType='arrow-forward'  
                        onPress={()=>this.onSignUp()}/>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',maxHeight:SIZES.height*0.2}}>
                            <SocialButton iconType='google' color='red'/>
                            <SocialButton iconType='facebook' color='blue'/>
                   </View>
                    
                <View style={{marginTop:10}}>
                        <Pressable style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}
                        onPress={()=>this.props.navigation.navigate('login')}>
                            <Text style={{color:'#eb4034',fontWeight:'bold' ,fontSize:18}}>Already have any account </Text>
                            <Text style={{color:'#000',fontWeight:'bold' ,fontSize:19,borderBottomWidth:2,borderBottomColor:'#eb4034'}}> Sign In</Text>
                        </Pressable>
                </View>       
            
            </KeyboardAvoidingView>
            
        )
    }
}

export default Register

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding:20,
    },
    headerContainer:{
        justifyContent:'center',
        alignItems:'center',
        height:100      
    },
    logo:{
        height:150,
        width:150,
        resizeMode:'cover'
    },
    heading:{
        fontSize:30,
        fontWeight:'bold',
        color:COLORS.primary,
        marginHorizontal:50,
        marginTop:15,
        elevation:6
    },
    text:{
        fontSize:28,
        marginBottom:10,
        color:'#051f5f',
        },
    textsub:{
            fontSize:22,
            marginBottom:10,
            color:COLORS.gray,
        },
   
})