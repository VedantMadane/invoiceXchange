exports.dashboard = (req, res) => {
    res.render('dashboardPurchaser', { user: req.session.user });
};
