import * as firebase from 'firebase';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCmuXxFcQE2wc1KFiQe2L8nv1EQOcXFU9c",
  authDomain: "bhanumart-4052c.firebaseapp.com",
  projectId: "bhanumart-4052c",
  storageBucket: "bhanumart-4052c.appspot.com",
  messagingSenderId: "118353298774",
  appId: "1:118353298774:web:0f0e574dd3d801f7ff02f7",
  measurementId: "G-MP8Z835K2G"
  };

  if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
  }  


export default firebase;