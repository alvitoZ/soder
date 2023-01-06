"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let data = [
    {
        id: 1,
        nama: "seele",
    },
    {
        id: 2,
        nama: "seele2",
    },
    {
        id: 3,
        nama: "seele2",
    },
];
class UserController {
    index(req, res) {
        return res.send(data);
    }
    create(req, res) {
        // return res.send(req.body);
        const { id, nama } = req.body;
        data.push({
            id: id,
            nama: nama,
        });
        return res.send("data yg dibuat");
    }
    show(req, res) {
        let { id } = req.params;
        let test = data.find((e) => e.id == id);
        return res.send(test);
    }
    update(req, res) {
        throw new Error("Method not implemented.");
    }
    delete(req, res) {
        throw new Error("Method not implemented.");
    }
}
exports.default = new UserController();
