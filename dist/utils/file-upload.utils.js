"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editFileName = exports.imageFileFilter = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new common_1.BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const editFileName = (req, file, callback) => {
    let name = file.originalname.split('.')[0];
    name = name.split(' ').join('_');
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;
//# sourceMappingURL=file-upload.utils.js.map