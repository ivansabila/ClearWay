const isAuthenticatedMiddleware = (req, res, next) => {
    if (req.session.user) {
        const { role } = req.session.user;

        if (role === "subDistrict") return res.redirect("/subDistrict");
        if (role === "department") return res.redirect("/department");
        if (role === "trafficPolice") return res.redirect("/trafficPolice");
        return res.redirect("/");
    }

    next();
};

module.exports = isAuthenticatedMiddleware;
