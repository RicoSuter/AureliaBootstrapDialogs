import { inject } from "aurelia-framework";
import { DialogService } from "./dialog-service";
import { AlertDialog } from "./alert-dialog";

@inject(DialogService)
export class Dialogs {  
    constructor(private dialogService: DialogService) {
        
    }
    
    showAlert(message: string) {
        return this.dialogService.show<AlertDialog>("bootstrap/alert-dialog", { message: message });
    }
}