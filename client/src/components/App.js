import React, { useState } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'

function App() {
  const [name, setName] = useState()
  const [familyName, setFamilyName] = useState()
  const [staffID, setStaffID] = useState()

  return (
      name && familyName && staffID ? <Dashboard name={ name } familyName={ familyName } staffID = { staffID } /> : <Login onFormSubmit={setName} onFormSecondSubmit={setFamilyName} onFormThirdSubmit={setStaffID} />

  );
}

export default App;
