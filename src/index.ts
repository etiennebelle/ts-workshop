import { User } from "./models/User";

const user = new User({name: 'NEW USER', age: 0});

user.save()