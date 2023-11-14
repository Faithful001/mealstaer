const isAuthenticated = (req, res, next) => {
    if (req.session.user || req.user) {
        console.log("User is authenticated:", req.session.user);
        console.log("Request User:", req.user);
        return next();
    }
    else {
        console.log("User is not authenticated");
        return res.status(401).json({ error: "User is unauthorized" });
    }
};
module.exports = isAuthenticated;
//# sourceMappingURL=isAuthenticated.js.map