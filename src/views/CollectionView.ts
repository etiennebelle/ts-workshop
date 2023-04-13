import { Collection } from "../models/Collection";

export abstract class CollectionView<T, K> {
    constructor(
        public parent: Element,
        public collection: Collection<T, K>
    ) { }
    
    abstract renderItem(model: T, elementWrapper: Element): void;

    render(): void {
        this.parent.innerHTML = ''

        const templateElement = document.createElement('template')

        for (let model of this.collection.models) {
            const elementWrapper = document.createElement('div')
            this.renderItem(model, elementWrapper)
            templateElement.content.append(elementWrapper)
        }

        this.parent.append(templateElement.content)
    }
}