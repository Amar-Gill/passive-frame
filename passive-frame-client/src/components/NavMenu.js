import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { LogInLogOutBtn } from './LogInLogOutBtn'
import LogoutModal from './LogoutModal';

function NavMenu(props) {
    const [activeItem, setActiveItem] = useState('Profile')
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <LogoutModal setShowModal={setShowModal} showModal={showModal} setUserLoggedIn={props.setUserLoggedIn}/>
            
            <Menu pointing secondary>
                <Menu.Item
                    name='Profile'
                    active={activeItem === 'Profile'}
                    onClick={() => setActiveItem('Profile')}
                />
                <Menu.Item
                    name='Projects'
                    active={activeItem === 'Projects'}
                    onClick={() => setActiveItem('Projects')}
                />
                <Menu.Menu position = 'right'>
                    <Menu.Item
                        name = "Sign Out"
                        onClick={() => setShowModal(true)}
                    />
                    {/* <LogInLogOutBtn/> */}
                </Menu.Menu>
            </Menu>
        </div>
    )
}

export default withRouter(NavMenu);