import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, View,ActivityIndicator,SafeAreaView} from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS } from './../../constants/theme';


const OnlinePay =({route,navigation})=> {
    const {params} =route;
    const [webViewLoading,setWebViewLoading] =useState(false);
    const showSpinner=()=>setWebViewLoading(true);
    const hideSpinner=()=>setWebViewLoading(false);

    const updateNavigationParams=(value)=>{
      if(value.url === 'https://bhanumart.vitsol.in/thankyou'){
        navigation.navigate('Paytmstat',{ids:params.pid});
      }
    }
    
    const jsCode= 'Bhanumart Testing'
    /*window.addEventListener("message", function(event) {
      alert("This is a Entry Point Working in Android");
      init(event.data)
 });  */
    
  
    const onMsg =(event)=>{
      const res = JSON.parse(event.nativeEvent.data);
      console.log(res.message);
      if(res.message ==='https://bhanumart.vitsol.in/thankyou'){
        navigation.goBack();
      }
    }
    return (
      <View style={{flex:1}}>
        <WebView 
        source={{ uri: params.uri}} 
        onLoadStart={showSpinner}
        onLoadEnd={hideSpinner}
        androidHardwareAccelerationDisabled
        javaScriptEnabled
        injectedJavaScript={params?.injectedJavaScript}
        injectedJavaScript={jsCode}
        nativeConfig={params?.config}
        javaScriptCanOpenWindowsAutomatically
        collapsable
        onMessage={onMsg}
        onNavigationStateChange={(e)=>updateNavigationParams(e)}
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
export default OnlinePay;