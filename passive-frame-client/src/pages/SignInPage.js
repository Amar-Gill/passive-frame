import React, { useState, useEffect, useContext } from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import UserContext, { UserConsumer } from '../UserContext'

const SignInPage = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {user, setUser} = useContext(UserContext)

  useEffect(
    () => {
      if (localStorage.getItem('JWT')) {
        props.setUserLoggedIn(true)
      } else {
        props.setUserLoggedIn(false)
      }
    }
  )

  const handleSubmit = (e, props) => {
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
        console.log('Auth token is: ' + result.auth_token)
        console.log(result.user)
        setUser(result.user) // set user context to user object returned from API
        localStorage.setItem('JWT', result.auth_token)
        setUsername('')
        setPassword('')
      })
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
