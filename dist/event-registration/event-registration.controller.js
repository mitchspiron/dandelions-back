"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRegistrationController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const event_registration_service_1 = require("./event-registration.service");
let EventRegistrationController = class EventRegistrationController {
    constructor(eventRegistration) {
        this.eventRegistration = eventRegistration;
    }
    async createEventRegistration(dto) {
        return this.eventRegistration.createEventRegistration(dto);
    }
    async getEventRegistrationByEvent(slug) {
        return this.eventRegistration.getEventRegistrationByEvent(slug);
    }
    async filterEventRegistrationByEvent(slug, dto) {
        return this.eventRegistration.filterEventRegistrationByEvent(slug, dto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.EventRegistrationDto]),
    __metadata("design:returntype", Promise)
], EventRegistrationController.prototype, "createEventRegistration", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventRegistrationController.prototype, "getEventRegistrationByEvent", null);
__decorate([
    (0, common_1.Post)('/filter/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.FilterEventRegistrationDto]),
    __metadata("design:returntype", Promise)
], EventRegistrationController.prototype, "filterEventRegistrationByEvent", null);
EventRegistrationController = __decorate([
    (0, common_1.Controller)('event-registration'),
    __metadata("design:paramtypes", [event_registration_service_1.EventRegistrationService])
], EventRegistrationController);
exports.EventRegistrationController = EventRegistrationController;
//# sourceMappingURL=event-registration.controller.js.map