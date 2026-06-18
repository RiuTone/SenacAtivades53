import http from 'http'

const PORT = 3000;

const server = http.createServer((req, resp) => {
  resp.writeHead(200, {"content-type": "text/plain; charset=utf-8"});
  resp.end("Olá mundo, eu também sou um filho de Deus!")
  }
);

server.listen(PORT, () => {console.log(`Servidor executando em http://localhost:${PORT}`)})
export default server;
