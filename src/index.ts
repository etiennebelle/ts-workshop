import { User } from "./models/User";

const user = new User({ name: 'NEW USER', age: 28 });

// Petit rappel sur les "accesseurs"
class Person {
    constructor(public firstName: string, public lastName: string) { }
    get fullName(): string {return `${this.firstName} ${this.lastName}`}
}

const person = new Person('Etienne', 'Bellé')
console.log(person.fullName)
/* Ici on ne fait qu'une référence à fullName, le getter s'occupe d'invoquer la fonction donc on omet les ()*/