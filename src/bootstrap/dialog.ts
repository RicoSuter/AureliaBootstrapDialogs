import { bindable, inject, customElement, View } from "aurelia-framework";
import { DialogBase } from "./dialog-base";

@inject(Element)
@customElement("bs-dialog")
export class Dialog {
    @bindable
    title = "";

    @bindable
    showCloseButton = true;

    @bindable
    closeOnBackdrop = true;

    dialog: DialogBase;

    bind(view: any, myView: View) {
        this.dialog = myView.bindingContext as DialogBase;
    }

    checkDismissClick(event: Event) {
        if (this.closeOnBackdrop && event.srcElement.getAttribute("class").indexOf("modal fade in") !== -1)
            this.dialog.close();
    }
}