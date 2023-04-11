/* Créer un alias de type pour indiquer que callback est de type fonction 
qui ne prend pas d'arguments et ne retourne aucune valeur */
type Callback = () => void

export class Eventing {
    events: { [key: string]: Callback[] } = {};

    /* Bound(arrow) function (cf 'Attributes.ts' l.5/6) */
    on = (eventName: string, callback: Callback): void => {
        /* this.events[eventName] || []: User initalisé avec une propriété events qui est un objet vide, retournera undefined 
        Assigner un tableau vide à handlers jusqu'à ce qu'eventName soit défini */
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    };

    trigger = (eventName: string): void => {
        const handlers = this.events[eventName];
    
        if (!handlers || handlers.length === 0) {
          return;
        }
    
        handlers.forEach(callback => {
          callback();
        });
      };
}