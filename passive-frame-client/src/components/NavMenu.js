import React, { useState } from 'react';
import { Menu, Responsive, Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import LogoutModal from './LogoutModal';

function NavMenu(props) {
    const [activeItem, setActiveItem] = useState('Profile')
    const [showModal, setShowModal] = useState(false)


    return (
        <div>
            <LogoutModal setShowModal={setShowModal} showModal={showModal} setUserLoggedIn={props.setUserLoggedIn}/>
            
            <Menu pointing secondary>
                <Responsive as={Menu.Item} minWidth={790}
                    name='Profile'
                    active={activeItem === 'Profile'}
                    onClick={() => setActiveItem('Profile')}
                />
                <Responsive as={Menu.Item} minWidth={790}
                    name='Projects'
                    active={activeItem === 'Projects'}
                    onClick={() => setActiveItem('Projects')}
                />
                <Menu.Menu position = 'right'>
                    <Responsive as ={Menu.Item} minWidth={790}
                        name = "Sign Out"
                        onClick={() => setShowModal(true)}
                    />
                </Menu.Menu>
                <Responsive as ={Menu.Menu} maxWidth={789} position='right'>
                    
                    <Dropdown
                        item
                        icon ='bars'
                        >
                        <Dropdown.Menu>
                            <Dropdown.Item text='Profile'/>
                            <Dropdown.Item text='Projects'/>
                            <Dropdown.Item text='Sign Out' onClick={() => setShowModal(true)}/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Responsive>
            </Menu>
        </div>
    )
}

export default withRouter(NavMenu);