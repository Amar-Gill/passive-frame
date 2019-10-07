import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { LogInLogOutBtn } from './LogInLogOutBtn'
import LoginModal from './LoginModal';

function NavMenu() {
    const [activeItem, setActiveItem] = useState('home')
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <LoginModal setShowModal={setShowModal} showModal={showModal}/>
            <Menu pointing secondary>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={() => setActiveItem('home')}
                />
                <Menu.Item
                    name='messages'
                    active={activeItem === 'messages'}
                    onClick={() => setActiveItem('messages')}
                />
                <Menu.Menu position = 'right'>
                    <Menu.Item
                        name = "Log In"
                        onClick={() => setShowModal(true)}
                    />
                    {/* <LogInLogOutBtn/> */}
                </Menu.Menu>
            </Menu>
        </div>
    )
}

export default withRouter(NavMenu);