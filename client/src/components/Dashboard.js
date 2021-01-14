import React, { useState, useEffect } from 'react'
import { SocketProvider } from '../context/SocketProvider'
import { DashboardProvider } from '../context/DashboardProvider'
import { CardRender } from './CardRender'
import { Container } from 'react-bootstrap'
import '../css/display.css'

export default function Dashboard({ name, familyName, staffID }) {
    const [users, setUsers] = useState()
    const [tapId, setTapId] = useState()
    const [currentCount, setCurrentCount] = useState(0)

    useEffect(() => {
        document.querySelector(".count").innerHTML = currentCount
        return () => {

        }
    }, [currentCount])

    return (
        <>
        <SocketProvider>
            <DashboardProvider name={ name } familyName={ familyName } staffID = { staffID } setUsers = { setUsers } tapId = {tapId} setTapId = {setTapId} setCurrentCount={setCurrentCount}>
            <Container className="display-bar">
                <div className="display-div">
                    <h5 className="display-heading">Your Taps:</h5>
                    <h4 className="count">{currentCount}</h4>
                </div>
            </Container>
                <div className="userList">
                    {users ? users.map((user, index) => CardRender(user, index, setTapId)) : <div>Waiting for someone to join the lobby!</div>}
                </div>
            </DashboardProvider>
        </SocketProvider>
        </>
    )
}
