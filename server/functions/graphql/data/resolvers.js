const admin = require('firebase-admin')

admin.initializeApp()

const getCollection = async (collection) => {
  const data = []

  try {
    const query = await admin.firestore().collection(collection).get()
    !!query && query.forEach(doc =>
      data.push({
        uid: doc.id,
        ...doc.data()
      })
    )
  } catch (error) {
    console.log(error)
  }

  return data
}

const getDocument = async (collection, uid) => {
  let user = {}

  try {
    const doc = await admin.firestore().collection(collection).doc(uid).get()
    user = {
      uid: doc.id,
      ...doc.data()
    }
  } catch (error) {
    console.log(error)
  }

  return user
}

const resolveFunctions = {
  Query: {
    user: async (_, {uid}) => getDocument('users', uid),
    users: async () => await getCollection('users'),
    task: async (_, {uid}) => getDocument('users', uid),
    tasks: async () => await getCollection('tasks')
  }
}

export default resolveFunctions