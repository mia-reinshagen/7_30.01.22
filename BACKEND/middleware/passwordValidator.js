// Middleware qui permet de demander un Mdp renforcé
const passwordValidator = require('password-validator');

let schema = new passwordValidator();

schema
.is().min(6)
.is().max(30)
.has().lowercase()
.has().digits(1)
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = (req, res, next) => {
    if(!schema.validate(req.body.password)) {
        res.writeHead(400, 'Mot de passe non valide : 6 caratères minimum, 1 chiffre & une lettre requis', {
            'content-type': 'application/json'
        });
        res.end('Format de mot de passe incorrect');
    } else {
        next();
    }
};