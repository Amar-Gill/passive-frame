import React from 'react';
import { Button, Header, Image, Icon, Modal } from 'semantic-ui-react';

const LogoutModal = (props) => {

    const logOut = e => {
        e.preventDefault()
        localStorage.removeItem('JWT')
        props.setUserLoggedIn(false)
    }

    return (
        <Modal basic size='mini' open={props.showModal} onClose={() => props.setShowModal(false)}>
            <Header>Confirm Action: Sign Out</Header>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => props.setShowModal(false)}>
                    <Icon name='remove' /> Cancel
          </Button>
                <Button color='green' inverted onClick={logOut}>
                    <Icon name='checkmark' /> Confirm
          </Button>
            </Modal.Actions>
        </Modal>
    )

}


export default LogoutModal;