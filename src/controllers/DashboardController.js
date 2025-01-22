const Book = require("../models/BookModel");

class DashboardController {
    static async index(req, res) {
        const id = req.session.user.id;

        const data = await Book.show(id);

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
        console.log("🚀 ~ DashboardController ~ index ~ message:", message)
        req.session.user.message = null;

        res.render("./user/userDashboard", { message: message, data: data, active: "book" });
    }
}

module.exports = DashboardController;
