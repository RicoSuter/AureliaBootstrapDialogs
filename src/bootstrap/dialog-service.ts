import { inject, Container, CompositionEngine, Controller, ViewSlot } from "aurelia-framework";
import { DialogBase } from './dialog-base';

@inject(CompositionEngine, Container)
export class DialogService {
    constructor(
        private compositionEngine: CompositionEngine,
        private container: Container) {

    }

    show<TDialog extends DialogBase>(viewModel: string, model?: any, 
        onCreated?: (dialog: TDialog) => void): Promise<TDialog> {
        
        var dialogDiv = document.createElement("div");
        var backdropDiv = document.createElement("div");
        backdropDiv.setAttribute("class", "modal-backdrop fade in");

        document.body.appendChild(dialogDiv);
        document.body.appendChild(backdropDiv);

        var instruction = {
            model: model,
            viewModel: viewModel,
            container: this.container,
            bindingContext: null,
            viewResources: null,
            viewSlot: new ViewSlot(dialogDiv, true)
        };
        
        return this.compositionEngine.compose(instruction).then((controller: Controller) => {
            return this.close<TDialog>(controller, dialogDiv, backdropDiv, onCreated);
        });
    }

    private close<TDialog extends DialogBase>(controller: Controller, dialogDiv: HTMLDivElement,
        backdropDiv: HTMLDivElement, onCreated?: (dialog: TDialog) => void): Promise<TDialog> {
        
        document.body.classList.toggle("modal-open");

        var view = controller.view;
        var dialog = view.bindingContext as TDialog;

        if (onCreated)
            onCreated(dialog);

        return new Promise<TDialog>((resolve, reject) => {
            dialog.element.addEventListener("close", () => {
                document.body.classList.toggle("modal-open");

                dialogDiv.remove();
                backdropDiv.remove();

                view.unbind();
                view.removeNodes(); 

                resolve(dialog);
            });
        });
    }
}