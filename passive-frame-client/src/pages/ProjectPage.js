import React, { useEffect } from 'react'
import { Menu, Button, Icon, Input, Header, Grid } from 'semantic-ui-react'
import StickyHorizontalDivider from '../components/StickyHorizontalDivider'

const ProjectPage = (props) => {
    // set states


    return (
        <div className="mt-42">
            <Menu className="fixed-submenu bg-white" secondary stackable>
                <Menu.Item fitted="vertically">
                    <Button compact className="remove-border-radius" icon secondary>
                        <Icon name="chevron left" />
                    </Button>
                {/* </Menu.Item>
                <Menu.Item> */}
                    <Header
                    as="h3"
                    style={{paddingLeft: 6, marginTop: "auto", marginBottom: "auto"}}
                    content={props.location.state.project_name}
                    subheader={props.location.state.project_number}/>
                    
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
