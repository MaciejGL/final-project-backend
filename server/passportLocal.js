const passport = require('passport');
const { Strategy } = require('passport-local');
const Pro = require('../models/Pro')

const authFields = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

passport.use(
  'login',
  new Strategy( authFields, async (req, email, password, cb) => {
    try {
      const user = await Pro.findOne({
        $or: [{ email }, { userName: email }],
      });

      if (!user || !user.password) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }

      const checkPassword = await user.comparePassword(password);

      if (!checkPassword) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }

      return cb(null, user, { message: 'Logged In Successfully' });
    } catch (err) {
      console.log(err);
      return cb(null, false, {statusCode: 400, message: err.message});
    }
  }
));

passport.use(
  'signup',
  new Strategy(authFields, async (req, email, password, cb) => {
    try {
      const checkEmail = await Pro.checkExistingField('email', email);
      if (checkEmail) {
        return cb(null, false, {
          statusCode: 409,
          message: 'Email already registered, log in instead',
        });
      }

      const newUser = new Pro();
      newUser.name = req.body.name,
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      await newUser.save();
      return cb(null, newUser);
    } catch (err) {
      console.log(err);
      return cb(null, false, {statusCode: 400, message: err.message});
    }
  }),
);