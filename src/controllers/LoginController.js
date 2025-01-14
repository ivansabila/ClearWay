class LoginController {
    static async index(req, res) {
        res.render("./auth/login", { error: "", oldData: {} });
    }
}

module.exports = LoginController;
