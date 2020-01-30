import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context/auth'
import NavMenu from '../ui-components/NavMenu'

function PrivateRoute ({ component: Component, ...rest }) {
  const { authTokens } = useAuth()

  return (
    <Route
      {...rest}
      render={props =>
        authTokens ? (
          <div>
            <NavMenu/>
            <Component {...props} />
          </div>
        ) : (
          <Redirect
            to={{ pathname: '/', state: { referer: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute
