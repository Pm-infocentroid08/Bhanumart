import React, {useState} from 'react';
import {View,Text,Button} from 'react-native'; 
import RNUpiPayment from 'react-native-upi-pay';


const Upi =()=>{
    const [paymentState, setPaymentState] = useState({ Status: '', txnId: '', GOOGLE_PAY: 'GOOGLE_PAY', PHONEPE: 'PHONEPE', PAYTM: 'PAYTM', message: '', });
        const floo=(paymentApp)=>{
            console.log('Init UPI payment');
            RNUpiPayment.initializePayment({
                vpa: '8308082945@ybl',  		//your upi address like 12345464896@okhdfcbank
                payeeName: ' abc',   			// payee name 
                amount: '1',				//amount
                transactionNote:'Testing Upi',		//note of transaction
                transactionRef: 'aasf-332-aoei-fn'	//some refs to aknowledge the transaction
            },paymentApp,successCallback,failureCallback);
        }
        const failureCallback=(data)=>{
            console.log(data)
            // in case no action taken
            if (data.status === 'FAILURE'){
                setPaymentState({ ...paymentState, Status: 'FAILURE', message: data.message, }); 
            }
            // in case of googlePay
            else if (data.Status === 'FAILURE'){
                setPaymentState({ ...paymentState, Status: 'FAILURE', message: 'app closed without doing payment', });
            }
            // in case of phonepe
            else if (data.Status === 'Failed') {
                setPaymentState({ ...paymentState, Status: 'FAILURE', message: 'app closed without doing payment', });
            }
            // in case of phonepe
            else if (data.Status === 'Submitted'){
                setPaymentState({ ...paymentState, Status: 'FAILURE', message: 'transaction done but pending', });
            }
            // any other case than above mentioned
            else{
                setPaymentState({ ...paymentState, Status: 'FAILURE', message: data.Status, }); 
            }
        }
        const successCallback=(data)=>{
            //
            console.log(data); 
            setPaymentState({ ...paymentState, Status: 'SUCCESS', txnId: data.txnId, message: 'Succccessfull payment', });
        }
        return (
        <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
        <View style={{flexDirection:'row',padding:5}}>
			<Button
			title="Google pay"
			onPress={() => {floo('GOOGLE_PAY');}}
			/>

			<Button
			title="Phone pe"
			onPress={() => {floo('PHONEPE');}}
			/>
			<Button
			title="PAYTM"
			onPress={() => {floo('PAYTM');}}
			/>
		</View>

        <Text>Payment status {paymentState.status + ' ' + paymentState.txnId}</Text>
        <Text>Message: {paymentState.message}</Text>
        </View>
        );
    
}

export default Upi;