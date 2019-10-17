import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'

const FormExampleForm = () => {
  // use states
  const [projectName, setProjectName] = useState('')

  return (
    <Form>
      <Form.Field>
        <label>Project Name</label>
        <input
          placeholder='Project Name'
          onChange={(e) => setProjectName(e.target.value)}
        />
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>

  )
}

export default FormExampleForm
