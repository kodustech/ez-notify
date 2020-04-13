import Vue from 'vue';
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = process.env.PRODUCTION_TIP === 'true';

if (!firebase.apps.length) {
  const configOptions = JSON.parse(process.env.FIREBASE_CONFIG);
  firebase.initializeApp(configOptions)
}

const fireDb = firebase.firestore()

export { fireDb }
