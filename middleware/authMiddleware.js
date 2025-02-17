module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.session.user) {
            return next();
        }
        res.redirect('/auth/login');
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.session.user) {
            return next();
        }
        res.redirect('/'); // Or redirect to a default dashboard
    },
    ensureRole: function(role) {
        return function(req, res, next) {
            if (req.session.user && req.session.user.role === role) {
                return next();
            }
            res.status(403).send('Access denied');
        }
    }
};
