import * as firebase from 'firebase'
import '@firebase/firestore'
import '@firebase/functions'

// const prodConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
// }

const prodConfig = {
  apiKey: "AIzaSyDhp15_KmZly9R1VOEAY6DCbnW4oc7MJ-M",
  authDomain: "fb-auth-starter.firebaseapp.com",
  databaseURL: "https://fb-auth-starter.firebaseio.com",
  projectId: "fb-auth-starter",
  storageBucket: "fb-auth-starter.appspot.com",
  messagingSenderId: "834237451631"
}

const devConfig = {
  apiKey: "AIzaSyDhp15_KmZly9R1VOEAY6DCbnW4oc7MJ-M",
  authDomain: "fb-auth-starter.firebaseapp.com",
  databaseURL: "https://fb-auth-starter.firebaseio.com",
  projectId: "fb-auth-starter",
  storageBucket: "fb-auth-starter.appspot.com",
  messagingSenderId: "834237451631"
}

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = firebase.firestore()
const functions = firebase.functions()

window.auth = auth
window.db = db
window.functions = functions

export {
  db,
  auth,
  functions
}
