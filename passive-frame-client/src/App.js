import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import NavMenu from './components/NavMenu'
import SignInPage from './pages/SignInPage'
import ProfilePage from './pages/ProfilePage'
import ProjectsPage from './pages/ProjectsPage'
import HomePage from './pages/HomePage'
import NewProjectPage from './pages/NewProjectPage'
import ProjectPage from './pages/ProjectPage'
import NewReportPage from './pages/NewReportPage'
import NewReportItemPage from './pages/NewReportItemPage'
import ReportItemsPage from './pages/ReportItemsPage'
import { UserProvider } from './UserContext'
import EditProjectPage from './pages/EditProjectPage'
import './App.css'

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(
    () => {
      if (localStorage.getItem('JWT')) {
        setUserLoggedIn(true)
      } else {
        setUserLoggedIn(false)
      }
    },
    [])

  useEffect(() => {
    if (userLoggedIn) {
      fetch(`http://127.0.0.1:5000/api/v1/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('JWT')
        }
      })
        .then(response => response.json())
        .then(result => {
          setUser(result) // get info for currently logged in user upon re-render
        })
    }
  }, [userLoggedIn])


  if (userLoggedIn) {
    return (
      <div>
        <UserProvider value={{ user, setUser }}>
          <NavMenu setUserLoggedIn={setUserLoggedIn} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/profile/" component={ProfilePage} />
            <Route exact path="/projects/" component={ProjectsPage} />
            <Route path="/projects/new_project/" component={NewProjectPage} />
            <Route path="/projects/:id/edit/" component={EditProjectPage} />
            <Route exact path="/projects/:id/" component={ProjectPage} />
            <Route path="/projects/:id/new_report/" component={NewReportPage} />
            <Route exact path="/projects/:projid/reports/:reportid/" component={ReportItemsPage} />
            <Route path="/projects/:projid/reports/:reportid/new_item/" component={NewReportItemPage} />
          </Switch>
        </UserProvider>
      </div>
    )
  } else {
    return (
      <div>
        <UserProvider value={{ user, setUser }}>
          <Route exact path="/" render={(props) => <SignInPage {...props} setUserLoggedIn={setUserLoggedIn} />} />

        </UserProvider>
      </div>
    )
  }
}

export default App
