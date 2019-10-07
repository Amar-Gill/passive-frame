import React from 'react';
import { Modal } from 'semantic-ui-react';

const LoginModal = (props) => (
    <Modal open={props.showModal} onClose={() => props.setShowModal(false)}>
        <Modal.Content>
            <Modal.Description>
                <p>
                    You require more Vespene Gas
        
            </p>

            </Modal.Description>

        </Modal.Content>
    </Modal>
)

export default LoginModal;