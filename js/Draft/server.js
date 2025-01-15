const jsonServer = require("json-server");
const hashPasswordMiddleware = require("./hashMiddleware");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(hashPasswordMiddleware); // Use the custom middleware
server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
