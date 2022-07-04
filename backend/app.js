// importe les modules
const express = require('express');
const mongoose = require('mongoose');
const helmet = require("helmet");
const path = require('path');
const dotEnv = require('dotenv');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
dotEnv.config();
const app = express();

// connexion a MongoDB
mongoose.connect(process.env.DATABASE,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  /**
   * Middleware general
   * recoit la requete et la reponse et les gerent
   */

// configuration du cors (Cross Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// middleware qui prend le contenu JSON et crée les propriétés req.body associées
app.use(express.json());

// Pour sécuriser les headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}));


// selon routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;