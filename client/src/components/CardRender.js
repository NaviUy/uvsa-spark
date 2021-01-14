import React from 'react'
import { Card, Button } from 'react-bootstrap'

export function CardRender({id, name, familyName, staff, count}, index, setId) {

    function tapHandler(id){
        return setId(id)
    }

    return (
        <Card style={{width: '18rem', marginLeft:'10px', marginTop: '10px'}} key={index}>
            <Card.Header style={{padding:'10px 10px 10px 10px'}}>Name: { name }</Card.Header>
            <Card.Title style={{padding:'10px 10px 10px 10px', marginBottom:'0'}}>Family: { familyName }</Card.Title>
            <Card.Title style={{padding:'10px 10px 10px 10px', marginBottom:'0'}}>Staff: { staff }</Card.Title>
            <Button style={{margin:'15px 15px 15px 15px'}} onClick={()=>{
                tapHandler(id)
            }}>Tap</Button>
        </Card>
    )
}
