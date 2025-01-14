class RegisterController {
    static async index(req, res) {
        res.render("./auth/register", { error: {}, oldData: {} });
    }
}

module.exports = RegisterController;
