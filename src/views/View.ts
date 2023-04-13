import { Model, HasId } from "../models/Model"
export abstract class View<T extends Model<K>, K extends HasId>{
    regions: { [key: string]: Element } = {}
    
    constructor(
        public parent: Element,
        public model: T
    ) {
        this.bindModel()
    }

    abstract template(): string

    eventsMap(): { [key: string]: () => void } {
        return {}
    }
    
    regionsMap(): { [key: string]: string } {
        return {}
    }

    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        })
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap()
        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':')
            
            fragment.querySelectorAll(selector).forEach(selector => {
                selector.addEventListener(eventName, eventsMap[eventKey])
            })
        }
    }

    mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap()

        for (let key in regionsMap) {
            const selector = regionsMap[key]
            this.regions[key] = fragment.querySelector(selector) as Element
            /* 
            const element = fragment.querySelector(selector)
            if (element) {
                this.regions[key] = element
            } */
        }
    }

    /* 211 - View nesting */
    // Pour faire disparaitre l'erreur, on va overwrite cette fonction dans UserEdit.ts
    onRender(): void { }

    render(): void {
        this.parent.innerHTML = ''

        const templateElement = document.createElement('template')
        templateElement.innerHTML = this.template()

        this.bindEvents(templateElement.content)
        this.mapRegions(templateElement.content)

        this.onRender()

        this.parent.append(templateElement.content)
    }
}