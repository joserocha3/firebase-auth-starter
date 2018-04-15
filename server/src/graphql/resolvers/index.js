import users from './users'
import tasks from './tasks'

const admin = require('firebase-admin')

admin.initializeApp()

const getCollection = async (collection, condition) => {
  const data = []

  try {
    const query = condition
      ? await admin.firestore().collection(collection).where(condition[0], condition[1], condition[2]).get()
      : await admin.firestore().collection(collection).get()
    !!query && query.forEach(doc => {
      data.push({
        id: doc.id,
        ...doc.data()
      })
    })

    await Promise.all(data.map(async (d, index) => {
      if (d.createdBy) {
        data[index].createdBy = await getDocument('users', d.createdBy)
      }
    }))

  } catch (error) {
    console.log(error)
  }

  return data
}

const getDocument = async (collection, id) => {
  let data = {}
  try {
    const doc = await admin.firestore().collection(collection).doc(id).get()
    data = {
      id: doc.id,
      ...doc.data()
    }
    if (data.createdBy) {
      // To avoid endless loop use admin instead of another getDocument
      const user = await admin.firestore().collection('users').doc(data.createdBy).get()
      data.createdBy = {
        id: user.id,
        ...user.data()
      }
    }
  } catch (error) {
    console.log(error)
  }

  return data
}

const resolveFunctions = {
  Query: {
    ...users,
    ...tasks
  }
}

export default resolveFunctions

export {
  admin,
  getCollection,
  getDocument
}