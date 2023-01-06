"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controller/UserController"));
class UserRoutes {
    // public data = {};
    constructor() {
        this.router = (0, express_1.Router)();
        // this.data = {
        //   nama: "seele",
        //   age: 10,
        // };
        this.routes();
    }
    routes() {
        this.router.get("/s", UserController_1.default.index);
        this.router.post("/s", UserController_1.default.create);
        this.router.get("/:id", UserController_1.default.show);
        this.router.put("/s:id", UserController_1.default.update);
        this.router.delete("/s:id", UserController_1.default.delete);
    }
}
exports.default = new UserRoutes().router;
