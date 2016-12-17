import { inject } from "aurelia-framework";
import { Dialogs } from "./bootstrap/dialogs";

@inject(Dialogs)
export class App {
  message = 'Hello World!';
  
  constructor(private dialogs: Dialogs){
    
  }

  showDialog() {
    this.dialogs.showAlert("Hello world!");
  }
}
