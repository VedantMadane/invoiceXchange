exports.dashboard = (req, res) => {
    res.render('dashboardVendor', { user: req.session.user });
};
