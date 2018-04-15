import { auth, db } from './firebase'

// User API

export const subscribeToUsers = (onUpdate) =>
  subscribeToCollection('users', onUpdate)

// Task API

export const subscribeToTasks = (onUpdate) =>
  subscribeToCollection('tasks', onUpdate)

export const createTask = async (title, description) => {
  try {
    if (!title) throw 'Title is required.'
    if (!description) throw 'Description is required.'

    return await db.collection('tasks').add({
      title,
      description,
      createdBy: auth.currentUser.uid,
      createdAt: new Date()
    })
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export const deleteTask = async (uid) => {
  try {
    if (!uid) throw 'ID is required.'
    
    return await db.collection('tasks').doc(uid).delete()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export const subscribeToCollection = (collection, onUpdate) => {
  return db.collection(collection).onSnapshot((query) => {
    const data = []

    query.forEach(doc =>
      data[doc.id] = {
        uid: doc.id,
        ...doc.data()
      }
    )

    onUpdate(data)
  })
}

export const getCollection = async collection => {
  const data = []

  try {
    const query = await db.collection(collection).get()
    !!query && query.forEach(doc =>
      data[doc.id] = {
        uid: doc.id,
        ...doc.data()
      }
    )
  } catch (error) {
    console.log(error)
  }

  return data
}
