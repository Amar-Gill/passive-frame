import React, { useState, useEffect, useContext } from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { Redirect, useLocation } from 'react-router-dom'
import { useAuth } from '../context/auth'

const SignInPage = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isError, setIsError] = useState(false) // TODO - catching and handling error state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setAuthTokens, setCurrentUser } = useAuth()
  let location = useLocation()
  const referer = location.state? location.state.referer : '/'


  const handleSubmit = (e) => {
    e.preventDefault()

    let userCredentials = {
      username: username,
      password: password
    }

    // open chrome without web protection to allow cross origin request:
    // open -a Google\ Chrome --args --disable-web-security --user-data-dir

    // fetch auth token from api
    fetch('http://127.0.0.1:5000/api/v1/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(userCredentials)
    })
      .then(response => response.json())
      .then(result => {
        if (result.status == "Success") {
          setAuthTokens(result.auth_token)
          setCurrentUser(result.user)
          setLoggedIn(true)
        } else {
          setIsError(true)
        }
      })
      .catch(e => {
        setIsError(true)
      })
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (

    <Segment placeholder>
      <Grid columns={2} relaxed='very' stackable>
        <Grid.Column>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              icon='user'
              iconPosition='left'
              label='Username'
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Input
              icon='lock'
              iconPosition='left'
              label='Password'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button content='Login' type='submit' primary />
          </Form>
        </Grid.Column>

        <Grid.Column verticalAlign='middle'>
          <Button content='Sign up' icon='signup' size='big' />
        </Grid.Column>
      </Grid>

      <Divider vertical>Or</Divider>
    </Segment>

  )
}

export default SignInPage
