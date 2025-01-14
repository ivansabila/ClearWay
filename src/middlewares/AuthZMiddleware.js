const AuthZMiddleware = (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;

        const { role } = req.session.user;
        const originalUrl = req.originalUrl;

        console.log("🚀 ~ AuthZMiddleware ~ req.session.user:", req.session.user);

        if (role === "subDistrict" && !originalUrl.startsWith("/subDistrict")) {
            return res.redirect("/subDistrict");
        }

        if (role === "department" && !originalUrl.startsWith("/department")) {
            return res.redirect("/department");
        }

        if (role === "trafficPolice" && !originalUrl.startsWith("/trafficPolice")) {
            return res.redirect("/trafficPolice");
        }

        return next();
    } else {
        return res.redirect("/login");
    }
};

module.exports = AuthZMiddleware;
