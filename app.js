const cfg = require('./src/config');
const server = require('./server');

server.listen(cfg.port, function() {
  console.log(`Starting server at http://localhost:${cfg.port}`);
});
