class DashboardController {
    static async index(req, res) {
        res.render("./user/userDashboard", { active: "book" });
    }
}

module.exports = DashboardController;
