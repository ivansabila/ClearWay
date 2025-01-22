const Book = require("../models/BookModel");

class BookController {
    static async index(req, res) {
        res.render("./user/userBook", { error: {}, oldData: {}, active: "book" });
    }

    static async store(req, res) {
        const { title, description, participant, event, location, startdate, enddate, starttime, endtime } = req.body;
        const id_user = req.session.user.id;
        const status = "menunggu";
        const objUser = { id_user, title, description, status, participant, event, location, startdate, enddate, starttime, endtime };

        const data = await Book.add(objUser);

        req.session.user.message = "Pembuatan izin pengajuan berhasil";

        return res.redirect("/");
    }

    static async show(req, res) {
        const { id, idbook } = req.params;
        const objUser = { id, idbook };

        if (id == req.session.user.id) {
            const data = await Book.detail(objUser);
            console.log("🚀 ~ BookController ~ show ~ data:", data)

            res.render("./user/userBookDetail", { data: data, active: "book" });
        } else {
            res.redirect(`/book/${req.session.user.id}/detail/${idbook}`);
        }
    }
}

module.exports = BookController;
