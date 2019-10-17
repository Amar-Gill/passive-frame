import React, {useContext} from 'react'
import UserContext from '../UserContext'

const ProfilePage = () => {
  const {user, setUser} = useContext(UserContext)


  return (
    <div>
      <h1>You require more vespene gas</h1>
      <h2>id: {user.id}</h2>
      <h2>username: {user.username}</h2>

    </div>
  )
}

export default ProfilePage
