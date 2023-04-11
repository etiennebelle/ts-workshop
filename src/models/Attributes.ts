import { UserProps } from "./User";

export class Attributes<T extends {}> {

    constructor(private data: T) { }
    
    get<K extends keyof T>(key: K): T[K] { /* K : Key Of Object (exemple, par convention on utilise seulement la lettre K) */
        return this.data[key];
    }

    set(dataUpdate: T): void {
        Object.assign(this.data, dataUpdate);
    }
}

const attrs = new Attributes<UserProps>({
    id: 5,
    age: 27,
    name: 'Etienne'
})

const name = attrs.get('name')
const age = attrs.get('age')
const id = attrs.get('id')