import React, { useState, useContext } from 'react'
import { Button, Form, Grid, Container } from 'semantic-ui-react'

const ProjectInfoForm = props => {

    const [projectName, setProjectName] = useState('')
    const [projectNumber, setProjectNumber] = useState('')
    const { user, setUser } = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        let projectObject = {
            projectName: projectName,
            projectNumber: projectNumber,
            organizationId: user.organization_id
        }

        // open chrome without web protection to allow cross origin request:
        // open -a Google\ Chrome --args --disable-web-security --user-data-dir

        // send info to API to create new project
        // PERFORM FETCH HERE FROM PROPS!!!
    }

    return (
        <Container text>
            <Grid columns={1} >
                <Grid.Column>
                    <h2>New Project</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <label>Project Name</label>
                            <input
                                placeholder='Project Name'
                                onChange={(e) => setProjectName(e.target.value)}
                            />
                            <label>Project Number</label>
                            <input
                                placeholder='Project Number'
                                onChange={(e) => setProjectNumber(e.target.value)}
                            />
                        </Form.Field>
                        <Container textAlign="right">
                            <Button className="remove-border-radius" secondary type='Submit'>Submit</Button>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault()
                                    props.history.push('/projects/')
                                }}
                                className="remove-border-radius"
                                secondary
                                basic>Back</Button>

                        </Container>
                    </Form>
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default ProjectInfoForm;