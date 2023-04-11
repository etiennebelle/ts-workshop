export class Attributes<T extends {}> {

    constructor(private data: T) { }
    
    /* Bound function (arrow function) */
    /* On évite les problèmes de contexte avec this: 'this' fera toujours référence à l'instance d'"attributes" */
    get = <K extends keyof T>(key: K): T[K] => { /* K : Key Of Object (exemple, par convention on utilise seulement la lettre K) */
        return this.data[key];
    }

    set(dataUpdate: T): void {
        Object.assign(this.data, dataUpdate);
    }

    getAll = (): T => {
        return this.data;
    }
}