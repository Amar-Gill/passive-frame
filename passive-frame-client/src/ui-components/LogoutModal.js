import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { useAuth } from '../context/auth'

const LogoutModal = (props) => {
  const { setAuthTokens, setCurrentUser } = useAuth()

  const logOut = e => {
    e.preventDefault()
    setAuthTokens()
    setCurrentUser()
  }

  return (
    <Modal basic size='mini' open={props.showModal} onClose={() => props.setShowModal(false)}>
      <Header>Do you want to sign out?</Header>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => props.setShowModal(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={logOut}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default withRouter(LogoutModal)
