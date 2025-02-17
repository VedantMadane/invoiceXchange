exports.dashboard = (req, res) => {
    res.render('dashboardAdmin', { user: req.session.user });
};
