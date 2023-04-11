export class Attributes<T extends {}> {
    constructor(private data: T) { }
    
    /* Bound function (arrow function) */
    /* On évite les problèmes de contexte avec this: 'this' fera toujours référence à l'instance d'"attributes" */
    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key];
    };

    set(update: T): void {
        Object.assign(this.data, update);
    }

    getAll(): T {
        return this.data;
    }
}