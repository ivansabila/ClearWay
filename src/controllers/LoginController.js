const User = require("../models/UserModel");

class LoginController {
    static async index(req, res) {
        res.render("./auth/login", { error: "", oldData: {} });
    }

    static async check(req, res) {
        // destructure body and create "objUser" object
        const { user, password } = req.body;
        const objUser = { user, password };

        // check data "objUser" object
        const data = await User.authN(objUser);

        if (!data.error) {
            req.session.user = {
                id: data.user.id,
                full_name: data.user.full_name,
                email: data.user.email,
                phone: data.user.phone,
                image: data.user.image,
                role: data.user.role,
                nik: data.user.nik,
                birthplace: data.user.birthplace,
                birthdate: data.user.birthdate,
                address: data.user.address,
                district: data.user.district,
                subdistrict: data.user.subdistrict,
                religion: data.user.religion,
                job: data.user.job,
                ktp: data.user.ktp,
            };

            return res.redirect("/");
        } else {
            return res.render("./auth/login", { error: data.error, oldData: req.body });
        }
    }

    static async logout(req, res) {
        req.session.destroy(() => {
            res.redirect("/login");
        });
    }
}

module.exports = LoginController;
