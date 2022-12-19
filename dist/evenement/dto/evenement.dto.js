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
exports.SwitchIsArchivedDto = exports.SwitchOnSubscribeDto = exports.SwitchOnHeaderDto = exports.FilterEvenementDto = exports.UpdateIllustrationDto = exports.UpdateEvenementDto = exports.CreateEvenementDto = void 0;
const class_validator_1 = require("class-validator");
class CreateEvenementDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEvenementDto.prototype, "idEntreprise", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEvenementDto.prototype, "titre", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEvenementDto.prototype, "illustration", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEvenementDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEvenementDto.prototype, "contenu", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreateEvenementDto.prototype, "deadline", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreateEvenementDto.prototype, "onSubscribe", void 0);
exports.CreateEvenementDto = CreateEvenementDto;
class UpdateEvenementDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEvenementDto.prototype, "titre", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEvenementDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEvenementDto.prototype, "contenu", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], UpdateEvenementDto.prototype, "deadline", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], UpdateEvenementDto.prototype, "onSubscribe", void 0);
exports.UpdateEvenementDto = UpdateEvenementDto;
class UpdateIllustrationDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateIllustrationDto.prototype, "illustration", void 0);
exports.UpdateIllustrationDto = UpdateIllustrationDto;
class FilterEvenementDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterEvenementDto.prototype, "searchkey", void 0);
exports.FilterEvenementDto = FilterEvenementDto;
class SwitchOnHeaderDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SwitchOnHeaderDto.prototype, "onHeader", void 0);
exports.SwitchOnHeaderDto = SwitchOnHeaderDto;
class SwitchOnSubscribeDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SwitchOnSubscribeDto.prototype, "onSubscribe", void 0);
exports.SwitchOnSubscribeDto = SwitchOnSubscribeDto;
class SwitchIsArchivedDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SwitchIsArchivedDto.prototype, "isArchived", void 0);
exports.SwitchIsArchivedDto = SwitchIsArchivedDto;
//# sourceMappingURL=evenement.dto.js.map