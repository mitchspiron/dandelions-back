"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_user_module_1 = require("./auth-user/auth-user.module");
const guards_1 = require("./common/guards");
const user_role_module_1 = require("./user-role/user-role.module");
const prisma_module_1 = require("./prisma/prisma.module");
const mailer_module_1 = require("./mailer/mailer.module");
const post_category_module_1 = require("./post-category/post-category.module");
const app_controller_1 = require("./app.controller");
const users_module_1 = require("./users/users.module");
const post_module_1 = require("./post/post.module");
const enterprise_module_1 = require("./enterprise/enterprise.module");
const platform_express_1 = require("@nestjs/platform-express");
const evenement_module_1 = require("./evenement/evenement.module");
const event_registration_module_1 = require("./event-registration/event-registration.module");
const comment_module_1 = require("./comment/comment.module");
const response_module_1 = require("./response/response.module");
const writer_request_module_1 = require("./writer-request/writer-request.module");
const socket_module_1 = require("./socket/socket.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        imports: [
            prisma_module_1.PrismaModule,
            auth_user_module_1.AuthUserModule,
            user_role_module_1.UserRoleModule,
            mailer_module_1.MailModule,
            post_category_module_1.PostCategoryModule,
            users_module_1.UsersModule,
            post_module_1.PostModule,
            enterprise_module_1.EnterpriseModule,
            platform_express_1.MulterModule.register({
                dest: './images',
            }),
            evenement_module_1.EvenementModule,
            event_registration_module_1.EventRegistrationModule,
            comment_module_1.CommentModule,
            response_module_1.ResponseModule,
            writer_request_module_1.WriterRequestModule,
            socket_module_1.SocketModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.AtGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map