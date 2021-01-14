import React, { useState } from 'react'
import { SocketProvider } from '../context/SocketProvider'
import { DashboardProvider } from '../context/DashboardProvider'
import { CardRender } from './CardRender'

export default function Dashboard({ name, familyName, staffID }) {
    const [users, setUsers] = useState()
    const [tapId, setTapId] = useState()

    return (
        <>
        <SocketProvider>
            <DashboardProvider name={ name } familyName={ familyName } staffID = { staffID } setUsers = { setUsers } tapId = {tapId} setTapId = {setTapId}>
                <div className="userList">
                    {users ? users.map((user, index) => CardRender(user, index, setTapId)) : <div></div>}
                </div>
            </DashboardProvider>
        </SocketProvider>
        </>
    )
}
