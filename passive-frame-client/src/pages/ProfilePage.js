import React, {useContext} from 'react'
import UserContext from '../UserContext'

const ProfilePage = () => {
  const {user, setUser} = useContext(UserContext)

  

  return (
    <div style={{marginTop: 42}}>
      <h2>username: {user? user.username : null}</h2>
      <h2>email: {user? user.email : null}</h2>
      <h2>id: {user? user.id : null}</h2>
      <h2>organization: {user? user.organization_name : null}</h2>
      <h2>organization_id: {user? user.organization_id : null}</h2>
    </div>
  )
}

export default ProfilePage
