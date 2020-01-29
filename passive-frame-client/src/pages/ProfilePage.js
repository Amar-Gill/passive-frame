import React from 'react'
import { useAuth } from '../context/auth'

const ProfilePage = () => {
  const { currentUser } = useAuth()

  return (
    <div className="mt-40">
      <h2>username: {currentUser.username}</h2>
      <h2>email: {currentUser.email}</h2>
      <h2>id: {currentUser.id}</h2>
      <h2>organization: {currentUser.organization_name}</h2>
      <h2>organization_id: {currentUser.organization_id}</h2>
      {/* <h2>THIS IS PROFILE PAGE/DASHBOARD</h2> */}
    </div>
  )
}

export default ProfilePage
