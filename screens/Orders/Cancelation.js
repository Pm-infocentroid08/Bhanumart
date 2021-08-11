import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, View,ActivityIndicator,SafeAreaView} from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS } from './../../constants/theme';


const CancelationPolicy =()=> {
    
    const [webViewLoading,setWebViewLoading] =useState(false);
    const showSpinner=()=>setWebViewLoading(true);
    const hideSpinner=()=>setWebViewLoading(false);

    
    
    
    return (
      <View style={{flex:1}}>
        <WebView 
        source={{ uri: 'https://bhanumart.vitsol.in/files/cancellation'}} 
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
            color={COLORS.bgcolor}
            size='large'
          />
        }
      </View>
    
    )  
}
export default CancelationPolicy;