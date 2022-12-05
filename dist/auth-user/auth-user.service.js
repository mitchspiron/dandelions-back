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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const mailer_service_1 = require("../mailer/mailer.service");
let AuthUserService = class AuthUserService {
    constructor(prisma, jwtService, mailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async signup(dto) {
        const token = await Promise.all([
            this.jwtService.signAsync(dto, {
                secret: 'super-secret',
                expiresIn: 60 * 15,
            }),
        ]);
        const userEmail = await this.prisma.utilisateur.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (userEmail)
            throw new common_1.ForbiddenException('Cet email appartient déjà à un utilisateur');
        await this.mailService
            .sendMailConfirmation(dto.email, token[0])
            .then(() => console.log('Vérifier votre boîte email!'))
            .catch(() => {
            throw new common_1.ForbiddenException("Un problème s'est produit, vérifier votre connexion internet!");
        });
    }
    async confirm(data, res, req) {
        const secret = 'super-secret';
        try {
            const newUser = this.jwtService.verify(data, { secret: secret });
            delete newUser.iat;
            delete newUser.exp;
            newUser.motDePasse = await this.hashData(newUser.motDePasse);
            const newConfirmUser = await this.prisma.utilisateur.create({
                data: {
                    nom: newUser.nom,
                    prenom: newUser.prenom,
                    illustration: 'normal-user.png',
                    email: newUser.email,
                    telephone: newUser.telephone,
                    aPropos: newUser.aPropos,
                    role: 3,
                    motDePasse: newUser.motDePasse,
                },
            });
            req.flash('info', 'Flash is back!');
            res.redirect('/bienvenu');
            return newConfirmUser;
        }
        catch (e) {
            res.redirect('http://localhost:8080/erreur-confirmation-email');
        }
    }
    async signin(dto) {
        const user = await this.prisma.utilisateur.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user)
            throw new common_1.ForbiddenException('Compte inexistant');
        const passwordMatches = await bcrypt.compare(dto.motDePasse, user.motDePasse);
        if (!passwordMatches)
            throw new common_1.ForbiddenException('Mot de passe incorrect');
        const token = await this.getToken(user.id, user.email, user.nom, user.prenom, user.role, user.illustration, user.telephone, user.aPropos);
        return [user, token];
    }
    decodeToken(req) {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const secret = 'at-secret';
        const data = this.jwtService.verify(token, { secret });
        delete data.iat;
        delete data.exp;
        return data;
    }
    async isLoggedIn(req, res) {
        if (!req.headers.authorization) {
            throw new common_1.UnauthorizedException('Session invalid');
        }
        try {
            const decoded = this.decodeToken(req);
            req.user = decoded;
            console.log(req.user);
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Session invalid');
        }
        res.send(req.user);
    }
    async forgotPassword(dto) {
        const token = await Promise.all([
            this.jwtService.signAsync(dto, {
                secret: 'super-secret',
                expiresIn: 60 * 15,
            }),
        ]);
        const userEmail = await this.prisma.utilisateur.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!userEmail)
            throw new common_1.ForbiddenException("Ce compte n'éxiste pas");
        await this.mailService
            .sendMailForgotPassword(dto.email, token[0])
            .then(() => console.log('Vérifier votre boîte email!'))
            .catch(() => {
            throw new common_1.ForbiddenException("Un problème s'est produit, vérifier votre connexion internet!");
        });
    }
    async resetPassword(dto, data) {
        try {
            const secret = 'super-secret';
            const newPassword = this.jwtService.verify(data, { secret: secret });
            delete newPassword.iat;
            delete newPassword.exp;
            const hash = await this.hashData(dto.motDePasse);
            const newUserPassword = await this.prisma.utilisateur.update({
                data: {
                    motDePasse: hash,
                },
                where: {
                    email: newPassword.email,
                },
            });
            return await newUserPassword;
        }
        catch (e) {
            throw new common_1.ForbiddenException("Ce lien a éxpiré! Vous ne pouvez plus l'utiliser pour recupérer votre mot de passe");
        }
    }
    hashData(data) {
        return bcrypt.hash(data, 10);
    }
    async getToken(idUser, emailUser, nomUser, prenomUser, roleUser, illustrationUser, telephoneUser, aProposUser) {
        const [at] = await Promise.all([
            this.jwtService.signAsync({
                sub: idUser,
                emailUser,
                nomUser,
                prenomUser,
                roleUser,
                illustrationUser,
                telephoneUser,
                aProposUser,
            }, {
                secret: 'at-secret',
                expiresIn: '1d',
            }),
        ]);
        return {
            access_token: at,
        };
    }
};
AuthUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        mailer_service_1.MailService])
], AuthUserService);
exports.AuthUserService = AuthUserService;
//# sourceMappingURL=auth-user.service.js.map