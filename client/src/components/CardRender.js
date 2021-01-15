import React from 'react'
import { Card, Button } from 'react-bootstrap'
import '../css/card.css'

export function CardRender({id, name, familyName, staff}, index, setId, isStaff, setKickId) {

    function tapHandler(id){
        return setId(id)
    }

    function kickHandler(id){
        return setKickId(id)
    }

    return (
        <Card style={{width: '18rem', marginLeft:'10px', marginTop: '10px'}} key={index}>
            <Card.Header className="card-header" style={{padding:'10px 10px 10px 10px'}}>
                <h6 className="name-header">Name: { name }</h6>
                {console.log(isStaff)}
                {isStaff === 'true' ?  <Button size="sm" onClick={()=> kickHandler(id)}>kick</Button> : <div></div>}
            </Card.Header>
            <Card.Img variant="top" src="https://icon-library.net/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg" />
            <Card.Title className="family-name" style={{padding:'10px 10px 10px 10px', marginBottom:'0', fontSize:"14px"}}>Family: { familyName }</Card.Title>
            <Button style={{margin:'15px 15px 15px 15px'}} onClick={()=>{
                tapHandler(id)
            }}>Tap</Button>
        </Card>
    )
}
