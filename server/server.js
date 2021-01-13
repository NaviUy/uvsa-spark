const path = require('path');
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { userJoin, getCurrentUser, getAllUsers, userLeave} = require('./utils/lobby')

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors:{
        origin:"http://localhost:3000",
        credentials: true
    }
})

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket =>{
    socket.on('joinRoom', ({ name, familyName, staffID }) => {
        const user = userJoin(socket.id, name, familyName, staffID)

        io.emit('message', `Welcome ${user.name} whose in ${user.familyName} and staff = ${user.staff}`)
        console.log(socket.id)

        io.emit('users', {
            users: getAllUsers()
        })

        socket.on('disconnect', () =>{
            const user = userLeave(socket.id)
            io.emit('message', `${user.name} has left the server.`)

            io.emit('users', {
                users: getAllUsers()
            })

        })
    })
})


io.listen(5000, () => console.log('Server starting...'));
