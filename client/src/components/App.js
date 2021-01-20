import React, { useState } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'

function App() {
  const [name, setName] = useState()
  const [familyName, setFamilyName] = useState()
  const [staffID, setStaffID] = useState()
  const [imgsrc, setImgSrc] = useState();
  const [imgName, setImgName] = useState();

  return (
      name && familyName && staffID && imgsrc ? <Dashboard name={ name } familyName={ familyName } staffID = { staffID } imgsrc={imgsrc} imgName={imgName}/> : <Login onFormSubmit={setName} onFormSecondSubmit={setFamilyName} onFormThirdSubmit={setStaffID} onFormFourthSubmit={setImgSrc} imgsrc={imgsrc} onFormFifthSubmit={setImgName} imgName={imgName}/>

  );
}

export default App;
