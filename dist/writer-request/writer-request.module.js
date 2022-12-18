"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriterRequestModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_service_1 = require("../mailer/mailer.service");
const writer_request_controller_1 = require("./writer-request.controller");
const writer_request_service_1 = require("./writer-request.service");
let WriterRequestModule = class WriterRequestModule {
};
WriterRequestModule = __decorate([
    (0, common_1.Module)({
        controllers: [writer_request_controller_1.WriterRequestController],
        providers: [writer_request_service_1.WriterRequestService, mailer_service_1.MailService],
    })
], WriterRequestModule);
exports.WriterRequestModule = WriterRequestModule;
//# sourceMappingURL=writer-request.module.js.map