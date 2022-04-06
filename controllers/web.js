
module.exports.home = async (req, res) => {
    res.render('home');
};
module.exports.uploadfile = async (req, res) => {
  res.render('uploadfile');
};

module.exports.search = async (req, res) => {
  res.render('search');
};

module.exports.login = async (req, res) => {
  res.render('login');
};

module.exports.register = async (req, res) => {
  res.render('register');
};

module.exports.changepassword = async (req, res) => {
  res.render('change-password');
};

module.exports.forgotpassword = async (req, res) => {
  res.render('forgot-password');
};

module.exports.logout = async (req, res) => {
  res.render('logout');
};

module.exports.profile = async (req, res) => {
  res.render('profile');
};
  