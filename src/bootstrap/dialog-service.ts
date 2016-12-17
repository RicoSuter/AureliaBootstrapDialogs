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
            document.body.classList.toggle("modal-open");

            var dialog = controller.view.bindingContext as TDialog;
            if (onCreated)
                onCreated(dialog);

            return this.waitForClose<TDialog>(dialog, controller, dialogDiv, backdropDiv);
        });
    }

    private waitForClose<TDialog extends DialogBase>(dialog: TDialog, controller: Controller, 
        dialogDiv: HTMLDivElement, backdropDiv: HTMLDivElement): Promise<TDialog> {
        
        return new Promise<TDialog>((resolve, reject) => {
            dialog.element.addEventListener("close", () => {
                document.body.classList.toggle("modal-open");

                dialogDiv.remove();
                backdropDiv.remove();

                controller.view.unbind();
                controller.view.removeNodes(); 

                resolve(dialog);
            });
        });
    }
}