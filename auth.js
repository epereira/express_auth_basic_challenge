const argon2 = require('argon2');

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };

const hashPassword = (req, res, next) => {
    const { password } = req.body;
    argon2.hash(password, hashingOptions).then(hash => {
        req.body.hashedPassword = hash;
        delete req.body.password;
        next();
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
};



module.exports = {
    hashPassword,
};