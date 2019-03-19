module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.render('login', {layout: false});//use layout false to not show default layout
  });

  app.get('/signup', (req, res) => {
    res.render('signup', {layout: false, error: req.flash('error')});
  });

  app.get('/login', (req, res) => {
    res.render('login', {layout: false, error: req.flash('error')});
  });

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    })
  );

  app.get('/home', isLoggedIn, (req, res) => {
    res.render('home', { username: `${req.user.firstname} ${req.user.lastname}` });
  });
  
  app.get('/devices', isLoggedIn, (req, res) => {
    res.render('devices', { username: `${req.user.firstname} ${req.user.lastname}` });
  });
  
  app.get('/deviceGroup', isLoggedIn, (req, res) => {
      res.render('deviceGroup', { username: `${req.user.firstname} ${req.user.lastname}` });
  });
  
  app.get('/device', isLoggedIn, (req, res) => {
    res.render('device', { username: `${req.user.firstname} ${req.user.lastname}` });
  });

  app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      res.redirect('/');
    });
  });

  app.post(
    '/signin', //track down where it is comming from Val- suspect this is from the action="/signin" on the login form
    passport.authenticate('local-signin', {
      successRedirect: '/home',
      failureRedirect: '/login',
      failureFlash: true
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect('/login');
  }
};
