import { Collection } from "./models/Collection";
import { User, UserProps } from './models/User'

const userCollection = User.buildUserCollection();

userCollection.on('change', () => {
  console.log(userCollection)
})

userCollection.fetch();

