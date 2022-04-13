import Router from "express";
import userController from '../controller/userController.js'

const router = Router();


router.route("/register")
    .post((req, res) => {
        const User = userController.register(req);
        res.send(User);
    })


router.route("/login")
    .get((req, res) => {
        const User = userController.login(req, res);
        res.send(User);
    })

router.route("/update")
    .put((req, res) => {
        userController.update(req, res);
    })

router.route("/delete")
    .delete((req, res) => {
        userController.remove(req, res);
    })

export default router;