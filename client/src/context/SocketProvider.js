import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket(){
    return useContext(SocketContext)
}

export function SocketProvider({ name, familyName, staffID, children }) {
    const [socket, setSocket] = useState()

    useEffect(() => {
        const newSocket = io('http://localhost:5000')
        setSocket(newSocket)

        newSocket.on('message', message => {
            console.log(message)
        })

        newSocket.on('users', ({ users }) =>{
            console.log(users)
        })

        newSocket.emit('joinRoom', { name, familyName, staffID })

        return () => {
            newSocket.close()
        }
    }, [name, familyName, staffID])


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
