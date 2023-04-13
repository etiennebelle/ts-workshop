import { View } from "./View";
import { User, UserProps } from "../models/User";

export class UserShow extends View<User, UserProps>{
    template(): string {
        return `
        <div>
            <div>${this.model.get('name')}</div>
            <div>${this.model.get('age')}</div>
        <div>
        `
    }
}