const AuthZMiddleware = (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;

        const { role } = req.session.user;
        const originalUrl = req.originalUrl;

        console.log("🚀 ~ AuthZMiddleware ~ req.session.user:", req.session.user);

        if (role === "subdistrict" && !originalUrl.startsWith("/district")) {
            return res.redirect("/district");
        }

        if (role === "admin" && !originalUrl.startsWith("/admin")) {
            return res.redirect("/admin");
        }

        if (role === "trafficpolice" && !originalUrl.startsWith("/trafficpolice")) {
            return res.redirect("/trafficpolice");
        }

        return next();
    } else {
        return res.redirect("/login");
    }
};

module.exports = AuthZMiddleware;
