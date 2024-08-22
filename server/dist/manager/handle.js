"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handle = void 0;
class Handle {
    safe(req, res) {
        // const {userId, location} = req.body;
        // console.log(userId, location);
        console.log(req.body);
        res.send('hello');
    }
}
exports.Handle = Handle;
