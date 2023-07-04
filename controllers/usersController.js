const models = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const validator = require('validator');
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

module.exports = {
    register: async (req, res) => {
        console.log(req.body);
        const { nom, prenom, email, password} = req.body;

        if(nom === "" || prenom === "" || email === "" || password === "") {
            res.status(500).json({ message: "Veuillez remplir tous les champs." });
        }

        if(!regexPassword.test(password)) {
            return res.status(400).json({ message: "invalid password"})
        }

        if(!validator.test(email)) {
            return res.status(400).json({ message: "invalid email"})
        }

        const user = await models.Users.findOne({ where: { email: 'email'}});

        if (user === null) {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                const newUser = await models.Users.create({
                    nom: nom,
                    prenom: prenom,
                    password: hash,
                    email: email
                });
                if(newUser) {
                    res.status(200).json({ message: "User créer" });
                } else {
                    res.status(400).json({ message: "Server crashed" });
                }
            })
        } else {
            res.status(500).json({ message: "Cet addresse à déjà été utilisé." });
        }
    }

};