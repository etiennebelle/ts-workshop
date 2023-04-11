import { User } from "./models/User";

const user = new User({ id: 1, name: 'ETIENNE', age: 28 });

user.on('save', () => {
    console.log(user)
})

user.save();

/* // Petit rappel sur les "accesseurs"
class Person {
    constructor(public firstName: string, public lastName: string) { }
    get fullName(): string {return `${this.firstName} ${this.lastName}`}
}

const person = new Person('Etienne', 'Bellé')
console.log(person.fullName)
/* Ici on ne fait qu'une référence à fullName, le getter s'occupe d'invoquer la fonction donc on omet les ()*/

