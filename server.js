//pour protéger les informations de connexion vers la BDD MongoDB
require("dotenv").config();

// import package http de node
const http = require('http');
// import de l'application
const app = require('./app');

/* La fonction normalizePort renvoie un port valide, 
qu'il soit fourni sous la forme d'un numéro ou d'une chaîne*/
const normalizePort = (val)=> {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT ||'3000');
app.set('port', port);

/* La fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée.
 Elle est ensuite enregistrée dans le serveur*/
const errorHandler = (error) => {
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
//on passe l'application express au serveur
const server = http.createServer(app);

/* écouteur d'évènements, consigne(mentionne) le port ou le canal nommé sur lequel
 le serveur s'exécute dans la console*/
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// configuration du serveur pour qu'il écoute
// Un écouteur d'évènements est également enregistré, mentionnant le port 
// ou le canal nommé sur lequel le serveur s'exécute dans la console.
server.listen(port);

/* La structure du back-end :
  - le front-end qui cherche à communiquer avec le back-end va chercher
  son point d'entrée par défaut, qui est le server.js
  - server.js va alors traiter et envoyer la requête vers app.js
  - app.js envoi la requête vers les routes; ici, on crée un dossier
  pour les routes puisqu'il peut y en avoir plusieurs.
  - ces routes vont alors passer d'abord par un système d'authentification
  de l'utilisation, dans le dossier middleware, qui contient les deux fichiers
  auth.js et multer.js
  - on va ensuite passer au controllers, qui lui va faire le plus gros boulot
  du CRUD : create, read, update, delete; la communication avec la base de données
  se fait ici.
  - le dossier models est un guide pour ce qui est possible de faire avec
  la base de données.*/
