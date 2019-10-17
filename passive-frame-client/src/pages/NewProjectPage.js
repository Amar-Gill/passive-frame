import React from 'react';
import { Button, Form } from 'semantic-ui-react'

const FormExampleForm = () => {
    //use states

    return (
        <Form>
            <Form.Field>
                <label>Project Name</label>
                <input placeholder='First Name' />
            </Form.Field>
            
            <Button type='submit'>Submit</Button>
        </Form>

    )
}

export default FormExampleForm