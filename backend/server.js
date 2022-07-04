// importe le package http de node
const http = require('http');

// importe le app.js
const app = require('./app');


/**
 * Normalize a port into a number, string, or false.
 */
// Exécute parseInt, qui convertit essentiellement la valeur en entier, si possible.
const normalizePort = val => {
  const port = parseInt(val, 10);
  // Vérifie si la valeur n'est pas un nombre.
  if (isNaN(port)) {
    return val;
  }
  // Vérifie si une valeur de port valide.
  if (port >= 0) {
    return port;
  }
  return false;
};

// port si environnement sinon 3000 par defaut
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// recherche les différentes erreurs et les gère de manière appropriée
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// chaque requete sur le server, appelle la fonction
const server = http.createServer(app);

server.on('error', errorHandler);
// écouteur d'évènements
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);