import { UserEdit } from "./views/UserEdit";
import { User, UserProps } from "./models/User";

const user = User.buildUser({ name: 'Mon nom', age: 0 })
const root = document.getElementById('root') as HTMLElement

if (root) {
  const userEdit = new UserEdit(root, user)
  userEdit.render();
  console.log(userEdit)
} else { throw new Error('Root element not found') }



