import React, { useContext, useEffect } from 'react'
import { useSocket } from './SocketProvider'

const DashboardContext = React.createContext()

export function useDashboard(){
    return useContext(DashboardContext)
}

export function DashboardProvider( { name, familyName, staffID, setUsers, tapId, setTapId, children }) {
    const socket = useSocket()

    useEffect(() => {
        if(socket == null) return

        socket.on('message', message => {
            console.log(message)
        })

        socket.on('users', ({ users }) =>{
           console.log(users)
           setUsers(users)
        })

        socket.emit('joinRoom', { name, familyName, staffID })

        return () => {
            socket.off('message')
            socket.off('users')
            socket.off('joinRoom')
        }
    }, [name, familyName, staffID, setUsers, socket])

    useEffect(() => {
        if(socket == null) return
        if(tapId){
            // console.log(tapId)
            socket.emit('tap', {tapId})
            setTapId()
        }
        return () => {
            socket.off('tap')
        }
    }, [tapId, setTapId, socket])



    const values = {
        name, familyName, staffID, setUsers
    }

    return (
        <DashboardContext.Provider value={values} >
            {children}
        </DashboardContext.Provider>
    )
}
