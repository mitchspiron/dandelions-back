"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRegistrationModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_service_1 = require("../mailer/mailer.service");
const event_registration_controller_1 = require("./event-registration.controller");
const event_registration_service_1 = require("./event-registration.service");
let EventRegistrationModule = class EventRegistrationModule {
};
EventRegistrationModule = __decorate([
    (0, common_1.Module)({
        controllers: [event_registration_controller_1.EventRegistrationController],
        providers: [event_registration_service_1.EventRegistrationService, mailer_service_1.MailService],
    })
], EventRegistrationModule);
exports.EventRegistrationModule = EventRegistrationModule;
//# sourceMappingURL=event-registration.module.js.map