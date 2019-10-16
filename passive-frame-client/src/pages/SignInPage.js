import React, { useState, useEffect } from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

const SignInPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(
        () => {
            if (localStorage.getItem('JWT')) {
                props.setUserLoggedIn(true)
            }
            else {
                props.setUserLoggedIn(false)
            }
        }
    )

    const handleSubmit = e => {
        e.preventDefault();

        let user = {
            username: username,
            password: password
        };

        // open chrome without web protection to allow cross origin request:
        // open -a Google\ Chrome --args --disable-web-security --user-data-dir

        // fetch auth token from api
        fetch('http://127.0.0.1:5000/api/v1/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result.auth_token)
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