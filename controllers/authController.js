const User = require('../models/User');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.render('register', { error: 'User already exists' });
        }
        user = new User({ name, email, password, role });
        await user.save();
        req.session.user = { id: user._id, role: user.role, name: user.name };
        // Redirect based on role
        if (user.role === 'admin') {
            res.redirect('/admin/dashboard');
        } else if (user.role === 'vendor') {
            res.redirect('/vendor/dashboard');
        } else {
            res.redirect('/purchaser/dashboard');
        }
    } catch (err) {
        console.error(err);
        res.render('register', { error: 'Error registering user' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', { error: 'Invalid credentials' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid credentials' });
        }
        req.session.user = { id: user._id, role: user.role, name: user.name };
        // Redirect based on role
        if (user.role === 'admin') {
            res.redirect('/admin/dashboard');
        } else if (user.role === 'vendor') {
            res.redirect('/vendor/dashboard');
        } else {
            res.redirect('/purchaser/dashboard');
        }
    } catch (err) {
        console.error(err);
        res.render('login', { error: 'Error logging in' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.redirect('/auth/login');
    });
};
