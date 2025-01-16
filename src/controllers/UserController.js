const User = require("../models/UserModel");
const capitalize = require("../utils/capitalize");

class UserController {
    static async index(req, res) {
        const { id } = req.params;

        if (id == req.session.user.id) {
            const data = await User.show(id);

            res.render("./user/userProfile", { data: data, active: "profile" });
        } else {
            res.redirect(`/profile/${req.session.user.id}`);
        }
    }

    static async edit(req, res) {
        const { id } = req.params;

        if (id == req.session.user.id) {
            res.render("./user/userProfileEdit", { error: {}, oldData: {}, active: "profile" });
        } else {
            res.redirect(`/profile/${req.session.user.id}/edit`);
        }
    }

    static async update(req, res) {
        let error = {};

        if (req.notPdf) {
            error.pdf = req.notPdf;
            return res.render("./user/userProfileEdit", { error: error, oldData: req.body, active: "profile" });
        }

        const { nik, full_name, birthplace, birthdate, address, district, subdistrict, religion, job } = req.body;
        const ktp = req.file ? `/uploads/pdf/${req.file.filename}` : req.session.user.ktp;
        const id = req.session.user.id;
        const objUser = { id, nik, full_name, birthplace, birthdate, address, district, subdistrict, religion, job, ktp };

        console.log("🚀 ~ UserController ~ update ~ objUser:", objUser);

        req.session.user.nik = objUser.nik;
        req.session.user.full_name = capitalize(objUser.full_name);
        req.session.user.birthplace = capitalize(objUser.birthplace);
        req.session.user.birthdate = objUser.birthdate;
        req.session.user.address = capitalize(objUser.address);
        req.session.user.district = objUser.district;
        req.session.user.subdistrict = objUser.subdistrict;
        req.session.user.religion = objUser.religion;
        req.session.user.job = objUser.job;
        req.session.user.ktp = objUser.ktp;

        const errors = await User.update(objUser);

        if (errors) {
            error.nik = errors;
            return res.render("./user/userProfileEdit", { error: error, oldData: req.body, active: "profile" });
        } else {
            return res.redirect(`/profile/${req.session.user.id}`);
        }
    }
}

module.exports = UserController;
