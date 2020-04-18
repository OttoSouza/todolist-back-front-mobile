const passport = require('passport');
const connection = require("../database/connection");
const {Strategy, ExtractJwt}  = require("passport-jwt");
const secret = require("../middleware/secret.json")

module.exports = app => {
  
const options = {
  secret_key : secret,
  jwt_request : ExtractJwt.fromAuthHeaderAsBearerToken()
};

const strategy = new Strategy(options, (email, senha, done) => {

  app.connection('usuarios').where({ email }).first()
  .then((usuario) => {
    if (!usuario) return done(null, false);
    if (!compare.comparePass(senha, usuario.senha)) {
      return done(null, false);
    } else {
      return done(null, usuario);
    }
  })
  .catch((err) => { return done(err); });
  
});

passport.use(strategy);

return {
  initialize: () => passport.initialize(),
  autheticate: passport.authenticate(("jwt", {session: false}))
}
};


