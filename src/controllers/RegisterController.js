const User = require("../models/UserModel");

class RegisterController {
    static async index(req, res) {
        res.render("./auth/register", { error: {}, oldData: {} });
    }

    static async store(req, res) {
        // destructure body and create "objUser" object
        const { full_name, email, phone, password } = req.body;
        const image = "/uploads/default.png";
        const role = "user";
        const objUser = { full_name, email, phone, password, image, role };

        // store data "objUser" object
        const error = await User.add(objUser);

        if (error) {
            return res.render("./auth/register", { error: error, oldData: req.body });
        } else {
            res.redirect("/login");
        }
    }
}

module.exports = RegisterController;
