import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, View,ActivityIndicator,SafeAreaView} from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS } from './../constants/theme';



const PrivacyPolicy =()=> {
    
    const [webViewLoading,setWebViewLoading] =useState(false);
    const showSpinner=()=>setWebViewLoading(true);
    const hideSpinner=()=>setWebViewLoading(false);

    
    
    
    return (
      <View style={{flex:1}}>
        <WebView 
        source={{ uri: 'https://bhanumart.vitsol.in/files/privacypolices'}} 
        onLoadStart={showSpinner}
        onLoadEnd={hideSpinner}
        androidHardwareAccelerationDisabled
        javaScriptEnabled       
        javaScriptCanOpenWindowsAutomatically
        collapsable        
        style={{marginTop:30}}/>
        {
          webViewLoading && 
          <ActivityIndicator
            animating
            color={COLORS.primary}
            size='large'
          />
        }
      </View>
    
    )  
}
export default PrivacyPolicy;