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
exports.AuthUserController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../common/decorators");
const auth_user_service_1 = require("./auth-user.service");
const dto_1 = require("./dto");
let AuthUserController = class AuthUserController {
    constructor(authService) {
        this.authService = authService;
    }
    signup(dto) {
        return this.authService.signup(dto);
    }
    confirm(token, res, req) {
        return this.authService.confirm(token, res, req);
    }
    signinLocal(dto) {
        return this.authService.signin(dto);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/signup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuthUserDtoSignup]),
    __metadata("design:returntype", void 0)
], AuthUserController.prototype, "signup", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('/signup/confirm/:token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "confirm", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/signin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuthUserDtoSignin]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "signinLocal", null);
AuthUserController = __decorate([
    (0, common_1.Controller)('auth-user'),
    __metadata("design:paramtypes", [auth_user_service_1.AuthUserService])
], AuthUserController);
exports.AuthUserController = AuthUserController;
//# sourceMappingURL=auth-user.controller.js.map