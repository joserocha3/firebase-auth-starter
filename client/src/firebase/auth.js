import { auth, functions } from './firebase'

export const createUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)

export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password)

export const signOut = () =>
  auth.signOut()

export const passwordReset = (email) =>
  auth.sendPasswordResetEmail(email)

export const passwordUpdate = (password) =>
  auth.currentUser.updatePassword(password)

export const createUser = async (email, password, role) => {
  try {
    const call = await functions.httpsCallable('createUser')
    return await call({email, password, role})
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export const assignRole = async (uid, role) => {
  try {
    const call = await functions.httpsCallable('assignRole')
    return await call({uid, role})
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}