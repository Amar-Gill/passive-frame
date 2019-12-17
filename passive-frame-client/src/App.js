import React, { useState, useEffect } from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import NavMenu from './components/NavMenu'
import SignInPage from './pages/SignInPage'
import ProfilePage from './pages/ProfilePage'
import ProjectsPage from './pages/ProjectsPage'
import Zer0System from './pages/Zer0System'
import NewProjectPage from './pages/NewProjectPage'
import ProjectPage from './pages/ProjectPage'
import NewReportPage from './pages/NewReportPage'
import NewReportItemPage from './pages/NewReportItemPage'
import ReportItemsPage from './pages/ReportItemsPage'
import EditProjectPage from './pages/EditProjectPage'
import EditReportPage from './pages/EditReportPage'
import EditReportItemPage from './pages/EditReportItemPage'
import { AuthContext } from "./context/auth";
import jwt from 'jsonwebtoken'
import './App.css'

function App(props) {
  const [authTokens, setAuthTokens] = useState()
  const [currentUser, setCurrentUser] = useState()

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data))
    setAuthTokens(data)
  }

  // TODO - add JWT required to all private api routes
  // and use useAuth hook to add token to request header
  
  // TODO - useEffect to check if token expired?
  // if expired: setAuthTokens() and setCurrentUser()
  // reasoning: update state of present session
  // check if auth token exists in local storage
  // check if authTokens state == localStorage.getItem("tokens")? necessary?
  // check if token expired
  // expired? redirect to signinpage : go to page and setAuthTokens(jwt) and setCurrentUser(user or whatever)
  useEffect(() => {
    if (localStorage.getItem("tokens") != "undefined") {
      setAuthTokens(JSON.parse(localStorage.tokens))
      // decode jwt to obtain user object
      const decoded = jwt.decode(JSON.parse(localStorage.tokens), {complete: true})
      setCurrentUser(decoded.payload.identity)
      // return redirect
      // does not redirect to referer if app is refereshed deep within the component tree
      return <Redirect to={{pathname: '/', state: {referer: props.location} }} />
    }
  }, [])


  return (
    // AuthContext.Provider given an object as argument for value prop.
    // This way useAuth will have authTokens state and setAuthTokens function to update authTokens.
    // useAuth hook doubles as hook for currentUser object
    <AuthContext.Provider value={{ authTokens, currentUser, setAuthTokens: setTokens, setCurrentUser: setCurrentUser }}>
      <BrowserRouter>
        <div>
          <NavMenu />
          <Switch>
            <Route exact path="/" render={(props) => <SignInPage {...props} />} />
            <PrivateRoute exact path="/zer0_system/" component={Zer0System} />
            <PrivateRoute exact path="/profile/" component={ProfilePage} />
            <PrivateRoute exact path="/projects/" component={ProjectsPage} />
            <PrivateRoute path="/projects/new_project/" component={NewProjectPage} />
            <PrivateRoute path="/projects/:id/edit/" component={EditProjectPage} />
            <PrivateRoute exact path="/projects/:projid/" component={ProjectPage} />
            <PrivateRoute path="/projects/:projid/new_report/" component={NewReportPage} />
            <PrivateRoute exact path="/projects/:projid/edit_report/:reportid/" component={EditReportPage} />
            <PrivateRoute exact path="/projects/:projid/reports/:reportid/" component={ReportItemsPage} />
            <PrivateRoute path="/projects/:projid/reports/:reportid/new_item/" component={NewReportItemPage} />
            <PrivateRoute path="/projects/:projid/reports/:reportid/items/:itemid/edit/" component={EditReportItemPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
