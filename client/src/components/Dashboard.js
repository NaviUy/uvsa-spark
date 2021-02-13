import React, { useState, useEffect } from 'react'
import { SocketProvider } from '../context/SocketProvider'
import { DashboardProvider } from '../context/DashboardProvider'
import { CardRender } from './CardRender'
import { Container, Button } from 'react-bootstrap'
import Select from 'react-select'
import '../css/display.css'

export default function Dashboard({ name, familyName, staffID, imgsrc, imgName }) {
    const [users, setUsers] = useState([])
    const [tapId, setTapId] = useState()
    const [kickId, setKickId] =  useState()
    const [currentCount, setCurrentCount] = useState(0)
    const [isStaff, setIsStaff] = useState(false)
    const [reset, setReset] = useState()
    const [dropdowns, setDropdowns] = useState({value: 'ALL', label: 'ALL'})
    const [filter, setFilter] = useState({value: 'ALL', label: 'ALL'})
    const [filteredList, setFilteredList] = useState([])

    useEffect(() => {
        document.querySelector(".count").innerHTML = currentCount
        return () => {

        }
    }, [currentCount])

    useEffect(()=>{
        const makingList = [{value: 'ALL', label: 'ALL'}]
        const checkList = []
        for(let user of users){
            if(!checkList.includes(user.familyName.toLowerCase().replace(/\s/g, ""))){
                checkList.push(user.familyName.toLowerCase().replace(/\s/g, ""))
                const newEntry = { value: user.familyName, label: user.familyName}
                makingList.push(newEntry)
            }
        }
        setDropdowns(makingList)
    return () => {

    }}, [users])

    useEffect(()=>{
            if(filter.value === 'ALL'){
                setFilteredList(users)
            } else {
                const makingList= []
                for(let user of users){
                    if(user.familyName.toLowerCase().replace(/\s/g, "") === filter.value.toLowerCase().replace(/\s/g, "")){
                        makingList.push(user)
                    }
                }
                if(makingList.length < 1){
                    setFilter({value: 'ALL', label: 'ALL'})
                } else {
                    setFilteredList(makingList)
                }
            }
        return () => {

        }
    }, [filter, users])

    const filterHandler = obj => {
        setFilter(obj)
    }

    return (
        <>
        <SocketProvider>
            <DashboardProvider name={ name } familyName={ familyName } staffID = { staffID } setUsers = { setUsers } tapId = {tapId} setTapId = {setTapId} setCurrentCount={setCurrentCount} setIsStaff={setIsStaff} kickId={kickId} setKickId={setKickId} imgsrc={imgsrc} imgName={imgName} reset={reset} setReset={setReset}>
            <Container className="display-bar">
                <div className="display-div">
                    <h5 className="display-heading">Your Taps:</h5>
                    <h4 className="count">{currentCount}</h4>
                    <Button onClick={()=>window.location.reload()} className="leave" size="sm">Leave</Button>
                </div>
            </Container>
            {staffID === 'true' ? <Container className="display-bar">
                                        <div className="display-div-staff">
                                            <div>Staff Control Panel</div>
                                            <Button size="sm" className="reset" onClick={()=>{setReset(true)}}>Reset</Button>
                                        </div>
                                    </Container>
                                    : ""}

            <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isSearchable={false}
                    value={filter}
                    defaultValue={filter}
                    options={dropdowns}
                    onChange={filterHandler} />

            {/* <select id="filter" onChange={filterHandler(this)}>
                <option key="ALL" value="ALL">ALL</option>
                {dropdowns ? dropdowns.map(value => <option key={value} value={value}>{value}</option>) : ""}
            </select> */}
                <div className="userList">
                    {filteredList.length !== 0 ? <div className="card-container">{filteredList.map((user, index) => CardRender(user, index, setTapId, isStaff, setKickId))}</div> : <div className="waiting-lobby">Waiting for someone to join the lobby! <div className="loader"/></div>}
                </div>
            </DashboardProvider>
        </SocketProvider>
        </>
    )
}
