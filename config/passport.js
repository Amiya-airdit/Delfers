const passport = require("passport");
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const dotenv = require("dotenv");

const User = require("../models/user");

dotenv.config();

passport.use(
  new MicrosoftStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: `${process.env.CLIENT_URL}/auth/outlook/callback`,
      scope: ["user.read"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            userType: "user",
            password: null,
            companyName: "",
            fresh: false,
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
