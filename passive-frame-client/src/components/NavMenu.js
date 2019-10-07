import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function NavMenu() {
    const [activeItem, setActiveItem] = useState('home')

    return (
        <div>
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
                    name = 'Log In'
                    active={false}
                    />
                </Menu.Menu>
            </Menu>
        </div>
    )
}

export default withRouter(NavMenu);