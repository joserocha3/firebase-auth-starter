const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.createUser = functions.auth.user().onCreate((data) => {
  return admin.firestore().collection('users').doc(data.uid).set({
    email: data.email
  })
    .then(function () {
      console.log('User successfully written!')
    })
    .catch(function (error) {
      console.error('Error writing document: ', error)
    })
})