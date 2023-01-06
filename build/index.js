"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// console.log("sassadddasa2");
const express_1 = __importDefault(require("express"));
const UserRoutes_1 = __importDefault(require("./routers/UserRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.plugin();
        this.routes();
    }
    plugin() {
        this.app.use(body_parser_1.default.json());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, compression_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        // this.app.route("/").get((req: Request, res: Response) => {
        this.app.get("/", (req, res) => {
            res.send("dari ts");
        });
        this.app.use("/user", UserRoutes_1.default);
    }
}
const port = 5000;
const konek = new App().app;
// const konek2 = new App();
// konek.routes;
konek.listen(port, () => {
    console.log(`http:localhost:${port}`);
});
// const app = express();
// app.get("/", (req, res) => {
//   res.send("hawo");
// });
// app.listen(5000, () => {
//   console.log("http://localhost:5000");
// });