const validateProfileMiddleware = (req, res, next) => {
    // destructure body and create "objUser" object
    const { nik, full_name, birthplace, birthdate, address, sex, district, subdistrict, religion, job } = req.body;
    const objUser = { nik, full_name, birthplace, birthdate, address, sex, district, subdistrict, religion, job };

    // create "error" object
    let error = {};

    const nikRegex = /^-?\d+$/;
    if (!nikRegex.test(objUser.nik) || objUser.nik.length != 16) {
        error.nik = "Isi NIK anda dengan benar";
    }

    const fullNameRegex = /^[A-Za-z\s.]+$/;
    if (!fullNameRegex.test(objUser.full_name)) {
        error.full_name = "Isi nama anda dengan benar";
    }

    const birthPlaceRegex = /^[a-zA-Z.-]+$/;
    if (!birthPlaceRegex.test(objUser.birthplace)) {
        error.birthplace = "Isi tempat lahir anda dengan benar";
    }

    let today = new Date();
    let birth = new Date(objUser.birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    let monthDifference = today.getMonth() - birth.getMonth()
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    if (age < 21) {
        error.birthdate = "Usia minimal untuk mengajukan pengajuan adalah 21 tahun"
    }

    // check data in "error" object
    if (Object.keys(error).length) {
        console.log({ error: error, oldData: req.body });
        return res.render("./user/userProfileEdit", { error: error, oldData: req.body, active: "profile" });
    }

    next();
};

module.exports = validateProfileMiddleware;
