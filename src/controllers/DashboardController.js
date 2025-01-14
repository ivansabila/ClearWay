class DashboardController {
    static async index(req, res) {
        res.render("./admin/index", { error: {}, oldData: {} });
    }
}

module.exports = DashboardController;
