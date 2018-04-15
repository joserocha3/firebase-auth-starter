import { auth, db } from './firebase'

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