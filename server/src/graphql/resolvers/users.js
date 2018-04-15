import { getCollection, getDocument } from './'

export default {
  user: async (_, {id}) => await getDocument('users', id),
  users: async () => await getCollection('users')
}