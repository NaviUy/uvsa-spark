import React from 'react'
import { SocketProvider } from '../context/SocketProvider'

export default function Dashboard({ name, familyName, staffID }) {

    return (
        <>
        <SocketProvider name={ name } familyName={ familyName } staffID = { staffID }>
            <h1>{name}</h1>
            <h1>{familyName}</h1>
            <h1>{staffID}</h1>
        </SocketProvider>

        </>
    )
}
