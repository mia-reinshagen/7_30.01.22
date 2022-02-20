const fs = require("fs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Users } = require("../models");

// Permet de crée un utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new Users({
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Nouvelle utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Permet de ce connecter a un compte existant
exports.login = (req, res, next) => {
    Users.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur introuvable !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                        isAdmin: user.isAdminAccount,
                        token: jwt.sign(
                            {
                                id: user.id,
                                firstname: user.firstname,
                                isAdmin: user.isAdminAccount,
                            },
                            process.env.TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Récupère les info d'un utilisateur
exports.userInfo = async(req, res, next) => {
    const id = req.params.id;
    const userInfo = await Users.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    res.json(userInfo)
  };

  // Supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    Users.destroy({ where: { id: id } });
    res.json("Compte supprimé");
  };

  // Modifier le Mot de passe 
exports.editPassword = async (req, res, next) => {
    const id = req.params.id;
    const { oldPassword, newPassword } = req.body;
    const user = await Users.findOne({ where: { id: id } });
  
    bcrypt.compare(oldPassword, user.password).then(async (match) => {
      if (!match) res.json({ error: "Mauvais mot de passe" });
  
      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update(
          { password: hash },
          { where: { id: id } }
        );
        res.json("Mot de passe modifié");
      });
    });
  };