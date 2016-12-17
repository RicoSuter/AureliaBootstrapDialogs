var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('bootstrap/dialog-base',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var DialogBase = (function () {
        function DialogBase(element) {
            this.element = element;
        }
        DialogBase.prototype.close = function () {
            var event = new CustomEvent("close");
            this.element.dispatchEvent(event);
        };
        return DialogBase;
    }());
    DialogBase = __decorate([
        aurelia_framework_1.inject(Element),
        __metadata("design:paramtypes", [Element])
    ], DialogBase);
    exports.DialogBase = DialogBase;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('bootstrap/dialog-service',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var DialogService = (function () {
        function DialogService(compositionEngine, container) {
            this.compositionEngine = compositionEngine;
            this.container = container;
        }
        DialogService.prototype.show = function (viewModel, model, onCreated) {
            var _this = this;
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
                viewSlot: new aurelia_framework_1.ViewSlot(dialogDiv, true)
            };
            return this.compositionEngine.compose(instruction).then(function (controller) {
                return _this.close(controller, dialogDiv, backdropDiv, onCreated);
            });
        };
        DialogService.prototype.close = function (controller, dialogDiv, backdropDiv, onCreated) {
            document.body.classList.toggle("modal-open");
            var view = controller.view;
            var dialog = view.bindingContext;
            if (onCreated)
                onCreated(dialog);
            return new Promise(function (resolve, reject) {
                dialog.element.addEventListener("close", function () {
                    document.body.classList.toggle("modal-open");
                    dialogDiv.remove();
                    backdropDiv.remove();
                    view.unbind();
                    view.removeNodes();
                    resolve(dialog);
                });
            });
        };
        return DialogService;
    }());
    DialogService = __decorate([
        aurelia_framework_1.inject(aurelia_framework_1.CompositionEngine, aurelia_framework_1.Container),
        __metadata("design:paramtypes", [aurelia_framework_1.CompositionEngine,
            aurelia_framework_1.Container])
    ], DialogService);
    exports.DialogService = DialogService;
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('bootstrap/alert-dialog',["require", "exports", "aurelia-framework", "./dialog-base"], function (require, exports, aurelia_framework_1, dialog_base_1) {
    "use strict";
    var AlertDialog = (function (_super) {
        __extends(AlertDialog, _super);
        function AlertDialog() {
            return _super.apply(this, arguments) || this;
        }
        AlertDialog.prototype.activated = function (params) {
            this.message = params.message;
        };
        return AlertDialog;
    }(dialog_base_1.DialogBase));
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], AlertDialog.prototype, "message", void 0);
    AlertDialog = __decorate([
        aurelia_framework_1.inject(Element),
        __metadata("design:paramtypes", [])
    ], AlertDialog);
    exports.AlertDialog = AlertDialog;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('bootstrap/dialogs',["require", "exports", "aurelia-framework", "./dialog-service"], function (require, exports, aurelia_framework_1, dialog_service_1) {
    "use strict";
    var Dialogs = (function () {
        function Dialogs(dialogService) {
            this.dialogService = dialogService;
        }
        Dialogs.prototype.showAlert = function (message) {
            return this.dialogService.show("bootstrap/alert-dialog", { message: message });
        };
        return Dialogs;
    }());
    Dialogs = __decorate([
        aurelia_framework_1.inject(dialog_service_1.DialogService),
        __metadata("design:paramtypes", [dialog_service_1.DialogService])
    ], Dialogs);
    exports.Dialogs = Dialogs;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework", "./bootstrap/dialogs"], function (require, exports, aurelia_framework_1, dialogs_1) {
    "use strict";
    var App = (function () {
        function App(dialogs) {
            this.dialogs = dialogs;
            this.message = 'Hello World!';
        }
        App.prototype.showDialog = function () {
            this.dialogs.showAlert("Hello world!");
        };
        return App;
    }());
    App = __decorate([
        aurelia_framework_1.inject(dialogs_1.Dialogs),
        __metadata("design:paramtypes", [dialogs_1.Dialogs])
    ], App);
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        longStackTraces: environment_1.default.debug,
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('bootstrap/dialog',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var Dialog = (function () {
        function Dialog() {
            this.title = "";
            this.showCloseButton = true;
            this.closeOnBackdrop = true;
        }
        Dialog.prototype.bind = function (view, myView) {
            this.dialog = myView.bindingContext;
        };
        Dialog.prototype.checkDismissClick = function (event) {
            if (this.closeOnBackdrop && event.srcElement.getAttribute("class").indexOf("modal fade in") !== -1)
                this.dialog.close();
        };
        return Dialog;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Dialog.prototype, "title", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Dialog.prototype, "showCloseButton", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Dialog.prototype, "closeOnBackdrop", void 0);
    Dialog = __decorate([
        aurelia_framework_1.inject(Element),
        aurelia_framework_1.customElement("bs-dialog"),
        __metadata("design:paramtypes", [])
    ], Dialog);
    exports.Dialog = Dialog;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${message}</h1>\n  <button click.trigger=\"showDialog()\">Show dialog!</button>\n</template>\n"; });
define('text!bootstrap/alert-dialog.html', ['module'], function(module) { module.exports = "<template>\r\n    <require from=\"./dialog\"></require>\r\n\r\n    <bs-dialog title=\"Hello World!\">\r\n        <div class=\"modal-body\">\r\n            ${message}\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n            <button click.trigger=\"close()\">Close</button>\r\n        </div>\r\n    </bs-dialog>\r\n</template>"; });
define('text!bootstrap/dialog.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"modal fade in\" click.trigger=\"checkDismissClick($event)\" \r\n            style=\"display: block\" tabindex=\"-1\" role=\"dialog\">\r\n        <div class=\"modal-dialog\" role=\"document\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button if.bind=\"showCloseButton\" type=\"button\" class=\"close\" \r\n                            click.trigger=\"dialog.close()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                        <span aria-hidden=\"true\">&times;</span>\r\n                    </button>\r\n                    <h4 class=\"modal-title\">${title}</h4>\r\n                </div>\r\n                <slot></slot>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map