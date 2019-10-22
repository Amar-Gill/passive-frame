import React, { useState, useEffect } from 'react'
import { Menu, Button, Icon, Input, Header, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import StickyHorizontalDivider from '../components/StickyHorizontalDivider'

const ProjectPage = (props) => {
    // ALTERNATIVE - use url params to use API call to get current project object.
    // set currentProject object from props
    const [currentProject, setCurrentProject] = useState(props.location.state)

    useEffect(() => {
        console.log(currentProject)
    })


    return (
        <div className="mt-42">
            <Menu className="fixed-submenu bg-white" secondary stackable>
                <Menu.Item fitted="vertically">
                    <Button
                        onClick={() => {
                            props.history.push("/projects/")
                        }}
                        compact
                        className="remove-border-radius"
                        icon
                        secondary>
                        <Icon name="chevron left" />
                    </Button>
                    <Header
                    as="h3"
                    style={{paddingLeft: 6, marginTop: "auto", marginBottom: "auto"}}
                    content={currentProject.project_name}
                    subheader={currentProject.project_number}/>
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
                        <Button as={Link}
                        to={{
                            pathname: "/projects/" + currentProject.project_id +"/new_report/",
                            state: currentProject
                        }}
                        className="remove-border-radius" secondary icon>
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
