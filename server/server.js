const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const profile = require( './route/api/profile')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')

const test = require('./route/api/test')

const { userJoin, getCurrentUser, getAllUsers, userLeave, tapped, deleteImg, reset } = require('./utils/lobby')

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
	cors:{
		origin: "https://www.uvsaspark.com",
		credentials: true
	}
})



// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(bodyParser.json())

app.use("/route/api", profile)
// app.post('/route/api/test', (req, res) => {
//     console.log(req)
//     res.send("connected")
// })
// app.use("/", router)

// app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket =>{

    socket.on('tap', ({ tapId }) => {
        // io.emit('message', tapId)
        tapped(tapId)
        // console.log(getCurrentUser(tapId))
        io.to(tapId).emit('currentCount', {
            count: getCurrentUser(tapId).count
        })
    })

    socket.on('kick', ({ kickId }) =>{
        io.to(kickId).emit('kick', '')
        io.emit('users', {
            users: getAllUsers()
        })
    })

    socket.on('reset', ()=>{
        reset()
        io.emit('currentCount', {count: 0})
    })

    socket.on('joinRoom', ({ name, familyName, staffID, imgsrc, imgName }) => {
        const user = userJoin(socket.id, name, familyName, staffID, imgsrc, imgName, 0)

        io.emit('message', `Welcome ${user.name} whose in ${user.familyName} and staff = ${user.staff}`)
        socket.emit('currentUser', {
            userID: getCurrentUser(socket.id)
        })
        console.log(socket.id)

        io.emit('users', {
            users: getAllUsers()
        })

        socket.on('disconnect', () =>{
            const user = getCurrentUser(socket.id)
            deleteImg(user.imgName)
            userLeave(user.id)
            io.emit('message', `${user.name} has left the server.`)

            io.emit('users', {
                users: getAllUsers()
            })

        })
    })
})

app.get('/', (req, res) => {
 res.send('<h1>API, hello world!</h1>')
});

server.listen(5000, () => console.log('Server starting...'));
