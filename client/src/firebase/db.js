import { db } from './firebase'

// User API

export const subscribeToUsers = (onUpdate) =>
  subscribeToCollection('users', onUpdate)

export const subscribeToCollection = (collection, onUpdate) => {
  return db.collection(collection).onSnapshot((query) => {
    const data = []

    query.forEach(doc =>
      data[doc.id] = {...doc.data()}
    )

    onUpdate(data)
  })
}

export const getCollection = async collection => {
  const data = []

  try {
    const query = await db.collection(collection).get()
    !!query && query.forEach(doc =>
      data[doc.id] = {...doc.data()}
    )
  } catch (error) {
    console.log(error)
  }

  return data
}
