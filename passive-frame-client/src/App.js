import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import NavMenu from './components/NavMenu'
import SignInPage from './pages/SignInPage'
import ProfilePage from './pages/ProfilePage';
import ProjectsPage from './pages/ProjectsPage';
import HomePage from './pages/HomePage';



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
        <NavMenu setUserLoggedIn={setUserLoggedIn} />
        <Route exact path ="/" component={HomePage}/>
        <Route exact path ="/profile" component={ProfilePage}/>
        <Route exact path ="/projects" component={ProjectsPage}/>

      </div>
    )
  }
  else {
    return (
      <div>
  
        <Route exact path="/" render={(props) => <SignInPage {...props} setUserLoggedIn={setUserLoggedIn}/>} />

      </div>
    )
  }
}

export default App;
