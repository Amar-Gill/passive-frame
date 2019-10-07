import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import NavMenu from './components/NavMenu'
import SignInPage from './pages/SignInPage'


function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(null)

  useEffect(
    () => {
      if (localStorage.getItem('JWT')) {
        setUserLoggedIn(true)
      }
      else {
        setUserLoggedIn(false)
      }
    }
  )


  if (userLoggedIn) {
    return (
      <div>
        <NavMenu />
        <h1>
          Construct additional pylons
        </h1>

      </div>
    )
  }
  else {
    return (
      <Route exact path="/" render={(props) => <SignInPage {...props} setUserLoggedIn={setUserLoggedIn}/>} />
    )
  }
}

export default App;
