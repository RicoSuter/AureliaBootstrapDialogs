import { inject } from "aurelia-framework";

@inject(Element)
export class DialogBase {
    constructor(public element: Element) {
        
    }

    close() {
        var event = new CustomEvent("close");
        this.element.dispatchEvent(event);
    }
}