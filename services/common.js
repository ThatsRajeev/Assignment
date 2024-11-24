import bcrypt from 'bcrypt';
import passport from 'passport';

const isAuth = (req, res, done) => {
  return passport.authenticate('jwt')
};

const sanitizeUser = (user) => {
  return {id:user.id, email:user.email, org:user.org}
};

const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
}

export { isAuth, sanitizeUser, hashPassword };
