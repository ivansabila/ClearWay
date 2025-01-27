const Book = require("../models/BookModel");
const User = require("../models/UserModel");
const capitalize = require("../utils/capitalize");

class DistrictController {
    static async index(req, res) {
        // const subdistrict = req.session.user.email.split("@")[0];
        const subdistrict = capitalize(req.session.user.email.split("@")[0]);
        const today = new Date();

        const objUser = { subdistrict, today };

        const data = await Book.all_admin();

        let monthname = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jul", "Jun", "Agu", "Sep", "Okt", "Nov", "Des"];
        data.forEach((item) => {
            var loc = item.location.split("|").splice(-1);
            item.location = loc[0].split(", ")[0];

            if (item.enddate) {
                var start = item.startdate.split("-");
                var end = item.enddate.split("-");

                start[1] = start[1].split("")[0] == 0 ? start[1].split("")[1] : start[1];
                end[1] = end[1].split("")[0] == 0 ? end[1].split("")[1] : end[1];

                if (start[0] == end[0]) {
                    if (start[1] == end[1]) {
                        item.date = `${start[2]} - ${end[2]} ${monthname[start[1] - 1]} ${start[0]}`;
                    } else {
                        item.date = `${start[2]} ${monthname[start[1] - 1]} - ${end[2]} ${monthname[end[1] - 1]} ${start[0]}`;
                    }
                } else {
                    item.date = `${start[2]} ${monthname[start[1] - 1]} ${start[0]} - ${end[2]} ${monthname[end[1] - 1]} ${end[0]}`;
                }
            } else {
                var date = item.startdate.split("-");
                date[1] = date[1].split("")[0] == 0 ? date[1].split("")[1] : date[1];

                item.date = `${date[2]} ${monthname[date[1] - 1]} ${date[0]}`;
            }
        });

        let message = req.session.user.message;
        req.session.user.message = null;

        res.render("./admin/adminDashboard", { message: message, data: data, active: "book" });
    }

    static async show(req, res) {
        const { idbook } = req.params;

        const data = await Book.show_subdistrict(idbook);
        const datauser = await User.show_subdistrict(data.id_user);

        res.render("./admin/adminBook", { data: data, datauser: datauser, active: "book" });
    }

    static async checked(req, res) {
        const { idbook } = req.params;
        const { action } = req.body;

        if (action == "reject") {
            const status = "ditolak";
            const objUser = { idbook, status };

            console.log("🚀 ~ DistrictController ~ checked ~ objUser:", objUser);
            req.session.user.message = "Izin Pengajuan Anda Ditolak";

            await Book.update_reject(objUser);
        } else if (action == "accept") {
            const status = "diterima";
            const objUser = { idbook, status };

            req.session.user.message = "Izin Pengajuan Anda Diterima";

            await Book.update_accept_admin(objUser);
        }

        res.redirect("/district");
    }

    static async history(req, res) {
        const data = await Book.show_admin_history();

        let monthname = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jul", "Jun", "Agu", "Sep", "Okt", "Nov", "Des"];
        data.forEach((item) => {
            var loc = item.location.split("|").splice(-1);
            item.location = loc[0].split(", ")[0];

            if (item.enddate) {
                var start = item.startdate.split("-");
                var end = item.enddate.split("-");

                start[1] = start[1].split("")[0] == 0 ? start[1].split("")[1] : start[1];
                end[1] = end[1].split("")[0] == 0 ? end[1].split("")[1] : end[1];

                if (start[0] == end[0]) {
                    if (start[1] == end[1]) {
                        item.date = `${start[2]} - ${end[2]} ${monthname[start[1] - 1]} ${start[0]}`;
                    } else {
                        item.date = `${start[2]} ${monthname[start[1] - 1]} - ${end[2]} ${monthname[end[1] - 1]} ${start[0]}`;
                    }
                } else {
                    item.date = `${start[2]} ${monthname[start[1] - 1]} ${start[0]} - ${end[2]} ${monthname[end[1] - 1]} ${end[0]}`;
                }
            } else {
                var date = item.startdate.split("-");
                date[1] = date[1].split("")[0] == 0 ? date[1].split("")[1] : date[1];

                item.date = `${date[2]} ${monthname[date[1] - 1]} ${date[0]}`;
            }
        });

        res.render("./admin/adminHistory", { data: data, active: "history" });
    }

    static async users(req, res) {
        const data = await User.show_admin_users();

        res.render("./admin/adminUsers", { data: data, active: "users" });
    }
}

module.exports = DistrictController;
