module.exports = (req, res, next) => {
    try {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
            if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/.test(req.body.password)) {
                next()
            } else {;
                return res.status(400).json({ error: "mauvais format de password, au moins 1 maj et 1 min et chiffre, -+!*$@%_, entre 8 et 15" });
            }
        } else {
            return res.status(400).json({ error: "mauvais format d'email" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};