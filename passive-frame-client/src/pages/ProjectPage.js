import React from 'react'
import { Menu, Button, Icon } from 'semantic-ui-react'

const ProjectPage = (props) => {
    // set states

    return (
        <div className="mt-42">
            <Menu className="fixed-submenu" secondary>
                <Menu.Item>
                    <Button secondary>
                        Back
                    </Button>
                </Menu.Item>
                <Menu.Item>
                    <h3>HELLO WORLD</h3>
                </Menu.Item>
                <Menu.Item>
                    <Button secondary icon circular>
                        <Icon name="plus"/>
                    </Button>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default ProjectPage
