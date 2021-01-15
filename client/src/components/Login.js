import React, { useRef, useState } from 'react'
import  { Container, Form, Button, Row, Col } from 'react-bootstrap'
import logo from '../assets/download.jpg'
import '../css/login.css'

export default function Login({ onFormSubmit, onFormSecondSubmit, onFormThirdSubmit, msg } ) {

    const nameRef = useRef()
    const familyRef = useRef()
    const staffIDRef = useRef()
    const [toggle, setToggle] = useState(false);

    function handleSubmit(e){
        e.preventDefault()

        //validation
        //name cannot be empty
        if(document.querySelector(".name-field").value.replace(/\s/g, "").length === 0){
            document.querySelector(".name-field-validate").setAttribute("style", "margin-bottom: 0; color: red; display:block;");
        } else {
            document.querySelector(".name-field-validate").setAttribute("style", "display:none;");
            onFormSubmit(nameRef.current.value)
        }

        //family cannot be empty
        if(document.querySelector(".family-field").value.replace(/\s/g, "").length === 0){
            document.querySelector(".family-field-validate").setAttribute("style", "margin-bottom: 0; color: red; display:block;")
        } else {
            document.querySelector(".family-field-validate").setAttribute("style", "display:none;")
            onFormSecondSubmit(familyRef.current.value)
        }

        //input validation for staff
        if(toggle && document.querySelector(".staff-field").value.replace(/\s/g, "").length === 0){
            document.querySelector(".staff-field-validate").setAttribute("style", "margin-bottom: 0; color: red; display:block;")
        } else if(document.querySelector(".staff-field").value !== "socalsoproud") {
            document.querySelector(".staff-field-validate").setAttribute("style", "margin-bottom: 0; color: red; display:block;")
        } else {
            document.querySelector(".staff-field-validate").setAttribute("style", "display:none;")
            onFormThirdSubmit("true")
        }

        if(!toggle){
            onFormThirdSubmit("false")
        }

    }

    function handleCheck(){
        setToggle(!toggle);
        onFormThirdSubmit();
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
            </Row>
        </Container>
        <Container className="login-container">
            <Row className="form-row">
                <Col className="form-column">
                    <Form className="form-form" onSubmit={handleSubmit}>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Name:</Form.Label>
                            <Col>
                                <Form.Control className="name-field" type="text" ref={nameRef}/>
                                <p className="name-field-validate" style={{display:"none"}}>Invalid input!</p>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                        <Form.Label column sm={2}>Family:</Form.Label>
                            <Col>
                                <Form.Control className="family-field" type="text" ref={familyRef}/>
                                <p className="family-field-validate" style={{display:"none"}}>Invalid input!</p>
                            </Col>
                        </Form.Group>
                        <Form.Group className="staffID" as={Row}>
                            <Col sm={10}>
                                <Form.Check type="checkbox" onClick={()=> handleCheck()} label="Staff"/>
                            </Col>
                        </Form.Group>
                        <Form.Group className="toggle" as={Row} style={{display: "none"}}>
                        <Form.Label column sm={4}>Staff ID:</Form.Label>
                            <Col>
                                <Form.Control className="staff-field" type="password" ref={staffIDRef}/>
                                <p className="staff-field-validate" style={{display:"none"}}>Invalid input!</p>
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
