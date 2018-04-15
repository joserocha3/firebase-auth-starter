import { db } from './firebase'

// User API

export const subscribeToUsers = (onUpdate) =>
  subscribeToCollection('users', onUpdate)

// Task API

export const subscribeToTasks = (onUpdate) =>
  subscribeToCollection('tasks', onUpdate)

export const createTask = (description) => {
  db.collection('tasks').add({
    description
  })
    .then(() => console.log('Document successfully written!'))
    .catch((error) => console.error('Error writing document: ', error))
}

export const deleteTask = (uid) => {
  db.collection('tasks').doc(uid).delete()
    .then(() => console.log('Document successfully deleted!'))
    .catch((error) => console.error('Error removing document: ', error))
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
