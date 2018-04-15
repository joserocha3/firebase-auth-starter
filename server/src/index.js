const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

const roles = [
  'admin',
  'client'
]

/*
 *
 * Sync auth user updates with user collection for quick real-time access via Firestore
 *
 */
exports.syncUserCreate = functions.auth.user().onCreate(async (data) => {
  await wait(5000) // wait for claims to be written
  try {
    await admin.firestore().collection('users').doc(data.uid).set({
      email: data.email,
      role: await getRole(data.uid) || ''
    })
  } catch (error) {
    return console.error('Error writing document: ', error)
  }
})

exports.syncUserDelete = functions.auth.user().onDelete(async (data) => {
  try {
    await admin.firestore().collection('users').doc(data.uid).delete()
  } catch (error) {
    return console.error('Error deleting document: ', error)
  }
})

/*
 *
 * Create a user
 *
 */
exports.createUser = functions.https.onCall(async (data, context) => {

  // Perform validations

  if (!context || !context.auth || !context.auth.uid) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.')
  }

  if (!data || !data.email || !data.password || !data.role || !roles.includes(data.role)) {
    throw new functions.https.HttpsError('failed-precondition', 'Please supply an email address, password and valid role.')
  }

  if (!await isAdmin(context.auth.uid)) {
    throw new functions.https.HttpsError('permission-denied', 'Only admins can create users.')
  }

  // Now create the user

  let user
  try {
    user = await admin.auth().createUser({
      email: data.email,
      password: data.password
    })
  } catch (error) {
    console.error(error)
    throw new functions.https.HttpsError('unknown', 'Failed to create user.')
  }

  try {
    await admin.auth().setCustomUserClaims(user.uid, {active: true, [data.role]: true})
  } catch (error) {
    console.error(error)
    throw new functions.https.HttpsError('unknown', 'Failed to assign user role.')
  }

  return {
    uid: user.uid,
    email: user.email
  }
})

/*
 *
 * Delete a user
 *
 */
exports.deleteUser = functions.https.onCall(async (data, context) => {

  // Perform validations

  if (!context || !context.auth || !context.auth.uid) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.')
  }

  if (!data || !data.uid) {
    throw new functions.https.HttpsError('failed-precondition', 'Please supply a user ID.')
  }

  if (!await isAdmin(context.auth.uid)) {
    throw new functions.https.HttpsError('permission-denied', 'Only admins can delete users.')
  }

  if (data.uid === context.auth.uid) {
    throw new functions.https.HttpsError('failed-precondition', 'You cannot delete your own user.')
  }

  // Now delete the user

  try {
    await admin.auth().deleteUser(data.uid)
  } catch (error) {
    console.error(error)
    throw new functions.https.HttpsError('unknown', 'Failed to delete user.')
  }

  return {
    uid: data.uid
  }
})

/*
 *
 * Assign a role to a user
 *
 */
exports.assignRole = functions.https.onCall(async (data, context) => {

  // Perform validations

  if (!context || !context.auth || !context.auth.uid) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.')
  }

  if (!data || !data.uid || !data.role || !roles.includes(data.role)) {
    throw new functions.https.HttpsError('failed-precondition', 'Please supply a user id and valid role.')
  }

  if (!await isAdmin(context.auth.uid)) {
    throw new functions.https.HttpsError('permission-denied', 'Only admins can assign roles.')
  }

  if (data.uid === context.auth.uid) {
    throw new functions.https.HttpsError('failed-precondition', 'You cannot change your own role.')
  }

  // Assign the role

  try {
    await admin.auth().setCustomUserClaims(data.uid, {[data.role]: true})
  } catch (error) {
    console.error(error)
    throw new functions.https.HttpsError('unknown', 'Failed to assign user role.')
  }

  // Update user collection

  try {
    await admin.firestore().collection('users').doc(data.uid).update({
      role: data.role
    })
  } catch (error) {
    throw new functions.https.HttpsError('unknown', 'Failed to update user collection.')
  }

  return {
    uid: data.uid,
    role: data.role
  }
})

const isAdmin = async (uid) =>
  await isRole(uid, 'admin')

const isRole = async (uid, role) => {
  const user = await admin.auth().getUser(uid)
  return !!(user && user.customClaims && user.customClaims[role])
}

const getRole = async (uid) => {
  const user = await admin.auth().getUser(uid)
  return user && user.customClaims && (
    user.customClaims.admin
      ? 'admin' : user.customClaims.client
      ? 'client' : ''
  )
}

const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms))
