"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mailer_service_1 = require("../mailer/mailer.service");
const auth_user_controller_1 = require("./auth-user.controller");
const auth_user_service_1 = require("./auth-user.service");
const strategies_1 = require("./strategies");
let AuthUserModule = class AuthUserModule {
};
AuthUserModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({})],
        controllers: [auth_user_controller_1.AuthUserController],
        providers: [auth_user_service_1.AuthUserService, strategies_1.AtStrategy, mailer_service_1.MailService],
    })
], AuthUserModule);
exports.AuthUserModule = AuthUserModule;
//# sourceMappingURL=auth-user.module.js.map