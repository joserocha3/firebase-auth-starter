import { db } from './firebase'

// User API

export const getAllUsers = async () =>
  await getCollection('users')

export const getCollection = async collection => {
  const data = []

  try {
    const query = await db.collection(collection).get()
    if (!query) return []
    query.forEach(doc =>
      data[doc.id] = {...doc.data()}
    )
  } catch (error) {
    console.log(error)
  }

  return data
}
