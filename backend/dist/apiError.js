"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError {
    message;
    statusCode;
    data;
    constructor(message, statusCode, data) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
    static notFound(message, data) {
        return new ApiError(message, 404, data);
    }
    static badRequest(message, data) {
        return new ApiError(message, 400, data);
    }
}
exports.default = ApiError;
//# sourceMappingURL=apiError.js.map