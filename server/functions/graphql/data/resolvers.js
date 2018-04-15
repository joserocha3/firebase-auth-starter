const admin = require('firebase-admin')

admin.initializeApp()

const getCollection = async (collection) => {
  const data = []

  try {
    const query = await admin.firestore().collection(collection).get()
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

const tasksByUser = async (id) => {
  const data = []

  try {
    const query = await admin.firestore().collection('tasks').where('createdBy', '==', id).get()
    !!query && query.forEach(doc =>
      data.push({
        id: doc.id,
        ...doc.data()
      })
    )
  } catch (error) {
    console.log(error)
  }

  return data
}

const resolveFunctions = {
  Query: {
    user: async (_, {id}) => await getDocument('users', id),
    users: async () => await getCollection('users'),
    task: async (_, {id}) => getDocument('tasks', id),
    tasks: async () => await getCollection('tasks'),
    tasksByUser: async (_, {id}) => await tasksByUser(id)
  }
}

export default resolveFunctions