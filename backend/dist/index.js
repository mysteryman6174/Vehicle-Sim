"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist/")));
const port = process.env.PORT || 3000;
app.get("/api", (_req, res) => {
    res.status(418).send("I'm a teapot");
});
const apiError_1 = __importDefault(require("./apiError"));
const router_1 = require("./scenarios/router");
const router_2 = require("./vehicles/router");
app.use("/api/scenarios", router_2.router);
app.use("/api/scenarios", router_1.router);
app.get("*", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../frontend/dist/index.html"));
});
app.use((err, _req, res, _next) => {
    if (err instanceof apiError_1.default) {
        res.status(err.statusCode).json(err.data || { message: err.message });
    }
    else {
        res.status(500).send(err.message);
    }
});
app.listen(port, () => console.log(`Server started on port ${port}`));
//# sourceMappingURL=index.js.map