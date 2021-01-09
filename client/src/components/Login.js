import React, { useRef, useState } from 'react'
import  { Container, Form, Button, Row, Col } from 'react-bootstrap'
import logo from '../assets/download.jpg'
import "../css/login.css"

export default function Login({ onFormSubmit, onFormSecondSubmit, onFormThirdSubmit } ) {

    const nameRef = useRef()
    const familyRef = useRef()
    const staffIDRef = useRef()
    const [toggle=false, setToggle] = useState();

    function handleSubmit(e){
        e.preventDefault()

        onFormSubmit(nameRef.current.value)
        onFormSecondSubmit(familyRef.current.value)
        onFormThirdSubmit(staffIDRef.current.value)
    }

    function handleCheck(){
        setToggle(!toggle);
        let refference = document.querySelector(".toggle")
        if(toggle){
            refference.setAttribute("style", "display:none");
        } else {
            refference.setAttribute("style", "display:block");
        }
    }

    return (
        <>
        <Container className="logo-container">
            <Row className="logo-row">
                <Col className="logo-column"><img src={logo} alt="logo" style={{height: "300px", width:"400px"}}/></Col>
            </Row></Container>
        <Container className="login-container" style={{height:'100vh' }}>
            <Row className="form-row">
                <Col className="form-column">
                    <Form className="form-form" onSubmit={handleSubmit}>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Name:</Form.Label>
                            <Col>
                                <Form.Control type="text" ref={nameRef}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                        <Form.Label column sm={2}>Family:</Form.Label>
                            <Col><Form.Control type="text" ref={familyRef}></Form.Control></Col>
                        </Form.Group>
                        <Form.Group className="staffID" as={Row}>
                            <Col sm={10}>
                                <Form.Check type="checkbox" onClick={()=> handleCheck()} label="Staff"/>
                            </Col>
                        </Form.Group>
                        <Form.Group className="toggle" as={Row} style={{display: "none"}}>
                        <Form.Label column sm={4}>Staff ID:</Form.Label>
                            <Col>
                                <Form.Control type="text" ref={staffIDRef}/>
                            </Col>
                        </Form.Group>
                        <Button type="submit">Enter</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </>
    )
}
