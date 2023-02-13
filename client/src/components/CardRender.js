import React from 'react'
import { Card, Button } from 'react-bootstrap'
import '../css/card.css'
import Default from '../assets/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'

export function CardRender({id, name, familyName, imgsrc, imgName}, index, setId, isStaff, setKickId) {

    function tapHandler(id){
        return setId(id)
    }

    function kickHandler(id){
        return setKickId(id)
    }

    return (
        <Card style={{width: '18rem', marginLeft:'10px', marginTop: '10px'}} key={index}>
            <div>this is branch #1</div>
            <Card.Header className="card-header" style={{padding:'10px 10px 10px 10px'}}>
                <h6 className="name-header">Name: { name }</h6>
                {/* {console.log(isStaff)} */}
                {isStaff === 'true' ?  <Button size="sm" onClick={()=> kickHandler(id)}>kick</Button> : <div></div>}
            </Card.Header>
            <Card.Img variant="top" src={imgsrc === 'default' ? Default : imgsrc} alt={imgName ==='default' ? "defaultImg" : imgName} />
            <Card.Title className="family-name" style={{padding:'10px 10px 10px 10px', marginBottom:'0', fontSize:"14px"}}>Family: { familyName }</Card.Title>
            <Button style={{margin:'15px 15px 15px 15px'}} onClick={()=>{
                tapHandler(id)
            }}>Tap</Button>
        </Card>
    )
}
