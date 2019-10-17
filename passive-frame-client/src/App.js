import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import NavMenu from './components/NavMenu'
import SignInPage from './pages/SignInPage'
import ProfilePage from './pages/ProfilePage'
import ProjectsPage from './pages/ProjectsPage'
import HomePage from './pages/HomePage'
import NewProjectPage from './pages/NewProjectPage'
import { UserProvider } from './UserContext'

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(null)
  const [user, setUser] = useState({})

  useEffect(
    () => {
      if (localStorage.getItem('JWT')) {
        setUserLoggedIn(true)
      } else {
        setUserLoggedIn(false)
      }
    },
    [])

  if (userLoggedIn) {
    return (
      <div>
        <UserProvider value={{user, setUser}}>
          <NavMenu setUserLoggedIn={setUserLoggedIn} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/projects" component={ProjectsPage} />
          <Route exact path="/new_project" component={NewProjectPage} />

        </UserProvider>
      </div>
    )
  } else {
    return (
      <div>
        <UserProvider value={{user, setUser}}>
          <Route exact path="/" render={(props) => <SignInPage {...props} setUserLoggedIn={setUserLoggedIn} />} />

        </UserProvider>
      </div>
    )
  }
}

export default App
