const Hapi = require('@hapi/hapi');
const routes = require('./routes');
 
// Buat publish ke GitHubnya
/*
Buat masukin ke Stash Git
git add .
git commit -m "fix bugs host value"

Push ke Remote Repository
git push origin master 

Update proyek web server di Compute Engine instance melalui SSH dan masuk ke folder notes-app-back-end.
git pull origin master
*/
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    // Host ini buat kalo misalnya sesuain IPnya local atau deploy
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
 
init();