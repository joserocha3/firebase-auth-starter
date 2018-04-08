import * as firebase from 'firebase'
import '@firebase/firestore'

// const prodConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
// }

const prodConfig = {
  apiKey: 'AIzaSyDEb7X812dlvtc0OXVf_ncdm57-7klMH98',
  authDomain: 'ddd-dashboard.firebaseapp.com',
  databaseURL: 'https://ddd-dashboard.firebaseio.com',
  projectId: 'ddd-dashboard',
  storageBucket: 'ddd-dashboard.appspot.com',
  messagingSenderId: '889077039754'
}

const devConfig = {
  apiKey: 'AIzaSyDEb7X812dlvtc0OXVf_ncdm57-7klMH98',
  authDomain: 'ddd-dashboard.firebaseapp.com',
  databaseURL: 'https://ddd-dashboard.firebaseio.com',
  projectId: 'ddd-dashboard',
  storageBucket: 'ddd-dashboard.appspot.com',
  messagingSenderId: '889077039754'
}

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = firebase.firestore()

window.auth = auth
window.db = db

export {
  db,
  auth
}
