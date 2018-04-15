import { getCollection, getDocument } from './'

const tasksByUser = async (id) =>
  getCollection('tasks', ['createdBy', '==', id])

export default {
  task: async (obj, {id}) => getDocument('tasks', id),
  tasks: async () => await getCollection('tasks'),
  tasksByUser: async (obj, {id}) => await tasksByUser(id)
}