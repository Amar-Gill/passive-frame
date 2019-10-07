import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import NavMenu from './components/NavMenu'
import SignInPage from './pages/SignInPage'


function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)


  if (userLoggedIn) {
    return (
      <div>
        <NavMenu/>
        <h1>
          Construct additional pylons
        </h1>
        
      </div>
    )
  }
  else {
    return (
      <Route exact path ="/" component={SignInPage}/>
    )
  }
}

export default App;
