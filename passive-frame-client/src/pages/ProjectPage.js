import React, { useEffect } from 'react'
import { Menu, Button, Icon, Input, Label } from 'semantic-ui-react'
import StickyHorizontalDivider from '../components/StickyHorizontalDivider'

const ProjectPage = (props) => {
    // set states


    return (
        <div className="mt-42">
            <Menu className="fixed-submenu bg-white" secondary stackable>
                <Menu.Item >
                    <Button as='div' labelPosition='right'>
                        <Button
                            onClick={() => {
                                props.history.push("/projects/")
                            }}
                            className="remove-border-radius"
                            icon
                            secondary
                        >
                            <Icon name='chevron left' />
                        </Button>
                        <Label className="remove-border-radius" basic pointing='left'>
                            {props.location.state.project_name}
                        </Label>
                    </Button>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item >
                        <Input
                            className='icon'
                            icon='search'
                            action={{ type: 'submit' }}
                            placeholder='Filter Project Number'
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Button className="remove-border-radius" secondary icon>
                            <Icon name="plus" />
                            New Report
                    </Button>
                    </Menu.Item>

                </Menu.Menu>
            </Menu>
            <StickyHorizontalDivider />
            <h1>LEEEERROOOOYYYYY........ JANKINZZZZ</h1>
        </div>
    )
}

export default ProjectPage
