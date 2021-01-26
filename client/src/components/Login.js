import React, { useRef, useState } from 'react'
import  { Container, Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import logo from '../assets/download.jpg'
import '../css/login.css'

export default function Login({ onFormSubmit, onFormSecondSubmit, onFormThirdSubmit, onFormFourthSubmit, imgsrc, onFormFifthSubmit, imgName } ) {

    const nameRef = useRef()
    const familyRef = useRef()
    const staffIDRef = useRef()
    const [toggle, setToggle] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [changed, setChanged] = useState(false)

    // const [deleted, setDeleted] = useState(true)

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

        fileUploader()

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

    function fileSelectedHandler(event){
        if(event.target.files[0] !== selectedFile) {
            setChanged(true)
            if(imgsrc && event.target.files[0]){
                console.log('deleteting!')
                onFormFourthSubmit()
                axios.post('http://localhost:5000/route/api/profile-img-delete', {imgsrc, imgName}).then(console.log("done"))
            }
        }
        setSelectedFile(event.target.files[0])

    }

    function fileUploader(){
        if(!imgsrc || changed){
            setChanged(false)
            const data = new FormData()
            // If file selected
            document.querySelector(".loader-row").setAttribute("style", "display:block")
            if ( selectedFile ) {
                data.append( 'profileImage', selectedFile, selectedFile.name )
                axios.post( 'http://localhost:5000/route/api/profile-img-upload', data, {
                    headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    }
                }).then( ( response ) => {
                    if ( 200 === response.status ) {
                        // If file size is larger than expected.
                        if( response.data.error ) {
                            if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
                                // console.log( 'Max size: 10MB', 'red' )
                                document.querySelector(".file-error").setAttribute("style", "margin-bottom: 0; color: red; display:block;")
                                document.querySelector(".file-error").innerHTML = 'Max size: 10MB'
                                document.querySelector(".loader-row").setAttribute("style", "display:none")
                            } else {
                                // console.log( response.data )
                                // console.log( response.data.error, 'red' )
                                document.querySelector(".file-error").setAttribute("style", "margin-bottom: 0; color: red; display:block;")
                                document.querySelector(".file-error").innerHTML = response.data.error
                                document.querySelector(".loader-row").setAttribute("style", "display:none")
                            }
                        } else {
                            // Success
                            // let fileName = response.data;
                            // console.log( 'fileName', fileName );
                            // console.log( 'File Uploaded', '#3089cf' )
                            // console.log(document)
                            console.log(response.data.location)
                            document.querySelector(".loader-row").setAttribute("style", "display:none")
                            onFormFourthSubmit(response.data.location)
                            onFormFifthSubmit(response.data.image)
                        }
                        }
                    }).catch( ( error ) => {
                    // If another error
                    console.log(error)
                    // document.querySelector(".file-error").setAttribute("style", "margin-bottom: 0; color: red; display:block;")
                    // document.querySelector(".file-error").innerHTML = error
                    // document.querySelector(".loader-row").setAttribute("style", "display:none")

                })
            } else {
                onFormFourthSubmit('default')
                onFormFifthSubmit('default')
                document.querySelector(".loader-row").setAttribute("style", "display:none")
            }
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
                        <Form.Group as={Row}>
                            <Col>
                                <Form.Label>Image (optional):</Form.Label>
                                <Form.File onChange={(e) => fileSelectedHandler(e)}/>
                                <div className="file-error" style={{display:"none"}}></div>
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
                        <Row className="loader-row" style={{display:"none"}}>
                            <Col className="loader-col">
                                <p>Image Uploading</p>
                                <div className="loader"></div>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            {/* <Button onClick={()=> axiosTest()}>TEST</Button> */}
        </Container>
        </>
    )
}
