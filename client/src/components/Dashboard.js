import React, { useState, useEffect } from 'react'
import { SocketProvider } from '../context/SocketProvider'
import { DashboardProvider } from '../context/DashboardProvider'
import { CardRender } from './CardRender'
import { Container, Button } from 'react-bootstrap'
import '../css/display.css'

export default function Dashboard({ name, familyName, staffID }) {
    const [users, setUsers] = useState([])
    const [tapId, setTapId] = useState()
    const [kickId, setKickId] =  useState()
    const [currentCount, setCurrentCount] = useState(0)
    const [isStaff, setIsStaff] = useState(false)

    useEffect(() => {
        document.querySelector(".count").innerHTML = currentCount
        return () => {

        }
    }, [currentCount])

    return (
        <>
        <SocketProvider>
            <DashboardProvider name={ name } familyName={ familyName } staffID = { staffID } setUsers = { setUsers } tapId = {tapId} setTapId = {setTapId} setCurrentCount={setCurrentCount} setIsStaff={setIsStaff} kickId={kickId} setKickId={setKickId}>
            <Container className="display-bar">
                <div className="display-div">
                    <h5 className="display-heading">Your Taps:</h5>
                    <h4 className="count">{currentCount}</h4>
                    <Button onClick={()=>window.location.reload()} className="leave" size="sm">Leave</Button>
                </div>
            </Container>
                <div className="userList">
                    {users.length !== 0 ? <div className="card-container">{users.map((user, index) => CardRender(user, index, setTapId, isStaff, setKickId))}</div> : <div className="waiting-lobby">Waiting for someone to join the lobby! <div className="loader"/></div>}
                </div>
            </DashboardProvider>
        </SocketProvider>
        </>
    )
}
