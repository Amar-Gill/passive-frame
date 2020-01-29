import React from 'react'
import { withRouter } from 'react-router-dom'

function LogInLogOutBtn () {
  // if (this.props.userLoggedIn) {
  //     return (
  //         <div>
  //             <a onClick={alert("logout")} href="#">Log Out</a>
  //         </div>
  //     )
  // }
  // else {
  return (
    <div>
      <a onClick={alert('login')} href="#">Log In</a>
    </div>
  )
}
// }

export default withRouter(LogInLogOutBtn)
