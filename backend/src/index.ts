import dotenv from 'dotenv'
import app from "./app"
import { Server as SocketServer } from 'socket.io'
import { createServer } from 'http'
dotenv.config()

const server = createServer(app)
console.log(process.env.CLIENT_URL)
const io = new SocketServer(server, {
    cors: {
        origin: process.env.CLIENT_URL,
    }
})



const rooms = new Map();

io.on('connection', (socket) => {
    let room
    socket.on('joinRoom', (room) => {

        socket.join(room);
        if (!rooms.has(room)) {
            rooms.set(room, { gameBoard: Array(9).fill(null), currentPlayer: 'X' });
        }
        socket.emit('initial_state', rooms.get(room));

    });

    socket.on('move', (data) => {
        const roomId = data.room;
        if (rooms.has(roomId)) {
            const room = rooms.get(roomId);
            const index = data.index;
            if (room.gameBoard[index] === null && (room.currentPlayer === 'X' || room.currentPlayer === 'O')) {
                room.gameBoard[index] = room.currentPlayer;
                room.currentPlayer = room.currentPlayer === 'X' ? 'O' : 'X';
                io.to(roomId).emit('move', room);
            }
        }
    })
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

});


server.listen(process.env.PORT, () => {
    console.log('listening on ' + process.env.PORT + '');
}
);

export { server as app }