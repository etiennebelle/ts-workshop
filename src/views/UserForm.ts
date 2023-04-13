import { User } from "../models/User"

export class UserForm {
    
    constructor(
        public parent: Element,
        public model: User
    ) {
        this.bindModel()
    }
    
    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        })
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-name': this.onSetNameClick,
            'click:.set-age': this.onSetAgeClick
        }
    }

    onSetNameClick = (): void => {
        const input = this.parent.querySelector('input') as HTMLInputElement
        const name = input.value

        this.model.set({ name });
    }

    onSetAgeClick = (): void => {
        this.model.setRandomAge()
    }

    template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <div>
                    <div>User's name: ${this.model.get('name')}</div>
                    <div>User's age: ${this.model.get('age')}</div>
                </div>
                <div>
                    <input />
                    <button class="set-name">Change Name</button>
                </div>
                <div>
                    <button class="set-age">Set Random Age</button>
                </div>
            </div>
        `
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

    render(): void {
        this.parent.innerHTML = ''

        const templateElement = document.createElement('template')
        templateElement.innerHTML = this.template()

        this.bindEvents(templateElement.content)

        this.parent.append(templateElement.content)
    }
}