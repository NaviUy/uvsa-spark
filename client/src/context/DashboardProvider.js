import React, { useContext, useEffect } from 'react'
import { useSocket } from './SocketProvider'

const DashboardContext = React.createContext()

export function useDashboard(){
    return useContext(DashboardContext)
}

export function DashboardProvider( { name, familyName, staffID, setUsers, tapId, setTapId, setIsStaff, setCurrentCount, kickId, setKickId, imgsrc, imgName, children }) {
    const socket = useSocket()

    useEffect(() => {
        if(socket == null) return

        socket.on('message', message => {
            console.log(message)
        })

        socket.on('users', ({ users }) =>{
            let listOfUsers = users.filter(user => user.id !== socket.id)
            // console.log(users)
            // console.log("socketID: " + socket.id)
            let isCurStaff = users.filter(user => user.id === socket.id)[0].staff
            // console.log(isCurStaff)
            setUsers(listOfUsers)
            setIsStaff(isCurStaff)
        })

        socket.emit('joinRoom', { name, familyName, staffID, imgsrc, imgName })

        socket.on('currentCount', ({count}) =>{
            setCurrentCount(count)
        })

        socket.on('kick', () =>{
            window.location.reload()
        })

        return () => {
            socket.off('message')
            socket.off('users')
            socket.off('joinRoom')
        }
    }, [name, familyName, staffID, setUsers, setCurrentCount, setIsStaff, socket, imgsrc, imgName])

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

    useEffect(() => {
        if(socket == null) return
        if(kickId){
            socket.emit('kick', {kickId})
            setKickId()
        }
        return () => {
            socket.off('kick')
        }
    }, [kickId, setKickId, socket])



    const values = {
        name, familyName, staffID, setUsers
    }

    return (
        <DashboardContext.Provider value={values} >
            {children}
        </DashboardContext.Provider>
    )
}
