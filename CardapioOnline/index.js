import http from 'http'

const PORT = 3000;

const server = http.createServer((req, resp) => {
  resp.writeHead(300, {"content-type": "text/plain"});
  resp.end("Olá mundo", "utf8")
  }
);

server.listen(PORT, () => {console.log(`Servidor executando em http://localhost:${PORT}`)})
export default server;
