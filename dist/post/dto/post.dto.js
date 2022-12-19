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
exports.FilterCategoryByPostDto = exports.FilterPostsVisitorDto = exports.FilterPostsDto = exports.SwitchTopDto = exports.SwitchRecommandedDto = exports.UpdateIllustrationDto = exports.UpdateStateDto = exports.UpdatePostDto = exports.CreatePostDto = void 0;
const class_validator_1 = require("class-validator");
class CreatePostDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePostDto.prototype, "idRedacteur", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePostDto.prototype, "idCategorie", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "titre", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "illustration", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "contenu", void 0);
exports.CreatePostDto = CreatePostDto;
class UpdatePostDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePostDto.prototype, "titre", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdatePostDto.prototype, "idCategorie", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePostDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePostDto.prototype, "contenu", void 0);
exports.UpdatePostDto = UpdatePostDto;
class UpdateStateDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateStateDto.prototype, "etat", void 0);
exports.UpdateStateDto = UpdateStateDto;
class UpdateIllustrationDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateIllustrationDto.prototype, "illustration", void 0);
exports.UpdateIllustrationDto = UpdateIllustrationDto;
class SwitchRecommandedDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SwitchRecommandedDto.prototype, "recommadee", void 0);
exports.SwitchRecommandedDto = SwitchRecommandedDto;
class SwitchTopDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SwitchTopDto.prototype, "top", void 0);
exports.SwitchTopDto = SwitchTopDto;
class FilterPostsDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterPostsDto.prototype, "searchkey", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterPostsDto.prototype, "searchCategory", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterPostsDto.prototype, "searchEtat", void 0);
exports.FilterPostsDto = FilterPostsDto;
class FilterPostsVisitorDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterPostsVisitorDto.prototype, "searchkey", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterPostsVisitorDto.prototype, "searchCategory", void 0);
exports.FilterPostsVisitorDto = FilterPostsVisitorDto;
class FilterCategoryByPostDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterCategoryByPostDto.prototype, "searchkey", void 0);
exports.FilterCategoryByPostDto = FilterCategoryByPostDto;
//# sourceMappingURL=post.dto.js.map