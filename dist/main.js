"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const session = require("express-session");
const express_flash_message_1 = require("express-flash-message");
const cookieParser = require("cookie-parser");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'images'), {
        index: false,
        prefix: '/images',
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('ejs');
    app.use(cookieParser());
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    }));
    app.use((0, express_flash_message_1.flash)({ sessionKeyName: 'flashMessage' }));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', process.env.URL_FRONT);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });
    app.enableCors({
        allowedHeaders: 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization',
        origin: process.env.URL_FRONT,
    });
    await app.listen(process.env.PORT);
    console.log('🚀 Server started at' + process.env.URL_BACK);
}
bootstrap();
//# sourceMappingURL=main.js.map