const AuthNMiddleware = (req, res, next) => {
    // destructure body and create "objUser" object
    const { full_name, email, phone, password } = req.body;
    const objUser = { full_name, email, phone, password };

    // create "error" object
    let error = {};

    // validate full_name
    const fullNameRegex = /^[A-Za-z\s.]+$/;
    if (!fullNameRegex.test(objUser.full_name)) {
        error.full_name = "Isi nama anda dengan benar";
    }

    // validate email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(objUser.email) || objUser.email.includes("@clearway.com")) {
        error.email = "Isi email anda dengan benar";
    }

    // validate phone
    const phoneRegex = /^\d+$/;
    let phoneValid = objUser.phone.replaceAll(" ", "");
    phoneValid = phoneValid.replace("+62", "0");
    if (phoneValid.length >= 10 || phoneValid.length <= 12) {    
        if (!phoneRegex.test(phoneValid)) {
            error.phone = "Isi nomor HP anda dengan benar";
        }
    }

    // validate password
    if (objUser.password.length < 8) {
        error.password = "Password minimal 8 karakter";
    }

    // check data in "error" object    
    if (Object.keys(error).length) {
        console.log({ error: error, oldData: req.body });
        return res.render("./auth/register", { error: error, oldData: req.body });
    }

    next();
};

module.exports = AuthNMiddleware;
