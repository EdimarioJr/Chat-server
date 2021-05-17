import express from 'express';
import socket, { Socket } from 'socket.io';
import http from 'http';


const app = express();
const httpServer = http.createServer(app);
const io = new socket.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
});


io.on('connection', (socket) => {
    console.log('conectei ao servidor!', socket.id);

    socket.join('salateste')

    acoesUsuario(socket);
})


function acoesUsuario(socket: Socket){
    socket.on("mensagemCliente" ,(mensagem) => {
        console.log(mensagem);
        io.to('salateste').emit('respostaServidor', mensagem);
    })
}


httpServer.listen(4000);