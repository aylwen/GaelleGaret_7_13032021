const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)  // Longueur minimun : 8
.has().uppercase() // Doit avoir au moins une majuscule
.has().lowercase() // Doit avoir au moins une minuscule
.has().digits() // Doit avoir au moins un chiffre
.has().not().spaces() // Ne doit pas avoir d'espaces (pas sur que ce soit une bonne régle)
.is().not().oneOf(['Passw0rd']); // Blacklist de valeurs à proscrire

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        return res.status(400).json({ message: 'Mot de passe non sécurisé !' });
    } else {
        next();
    }
};