import React, { useState } from 'react'
import { Menu, Responsive, Dropdown } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import LogoutModal from './LogoutModal'

function NavMenu (props) {
  const [activeItem, setActiveItem] = useState('')
  const [showModal, setShowModal] = useState(false)

  // lowerBreakpoint is maxWidth for mobile rendering
  // higherBreakpoint is minWidth for desktop rendering
  const [lowerBreakpoint, higherBreakpoint] = [789, 790]

  return (
    <div>
      <LogoutModal setShowModal={setShowModal} showModal={showModal} />

      <Menu className="bg-white" fluid pointing secondary style={{ position: 'fixed', top: 0, zIndex: 30 }}>
        <Responsive as={Menu.Item} minWidth={higherBreakpoint}
          name='ZERO_system'
          content="[ ZER0_system ]"
          active={activeItem === 'ZER0_system'}
          onClick={() => {
            setActiveItem('ZER0_system')
            props.history.push('/zer0_system/')
          }
          }
        />
        <Responsive as={Menu.Item} maxWidth={lowerBreakpoint}
          name='ZERO_system'
          content="[ ZER0_system ]"
          active={activeItem === 'ZER0_system'}
          onClick={() => {
            setActiveItem('ZER0_system')
            props.history.push('/zer0_system/')
          }
          }
        />
        <Responsive as={Menu.Item} minWidth={higherBreakpoint}
          name='Dashboard'
          active={activeItem === 'Dashboard'}
          onClick={() => {
            setActiveItem('Dashboard')
            props.history.push('/profile/')
          }
          }
        />

        <Responsive as={Menu.Item} minWidth={higherBreakpoint}
          name='Database'
          active={activeItem === 'Database'}
          onClick={() => {
            setActiveItem('Database')
            props.history.push('/projects/')
          }
          }
        />

        <Responsive as={Menu.Item} minWidth={higherBreakpoint}
          name='Assets'
          active={activeItem === 'Assets'}
          onClick={() => {
            setActiveItem('Assets')
            props.history.push('/zer0_system/')
          }
          }
        />

        <Menu.Menu position='right'>
          <Responsive as={Menu.Item} minWidth={higherBreakpoint}
            name="Sign Out"
            onClick={() => setShowModal(true)}
          />
        </Menu.Menu>
        <Responsive as={Menu.Menu} maxWidth={lowerBreakpoint} position='right'>

          <Dropdown
            item
            icon='bars'
          >
            <Dropdown.Menu>
              <Dropdown.Item
                text='Profile'
                name='Profile'
                active={activeItem === 'Profile'}
                onClick={() => {
                  setActiveItem('Profile')
                  props.history.push('/profile')
                }
                }
              />
              <Dropdown.Item text='Projects'
                name='Projects'
                active={activeItem === 'Projects'}
                onClick={() => {
                  setActiveItem('Projects')
                  props.history.push('/projects')
                }
                }
              />
              <Dropdown.Item text='Assets'
                name='Assets'
                active={activeItem === 'Assets'}
                onClick={() => {
                  setActiveItem('Assets')
                  props.history.push('/zer0_system/')
                }
                }
              />
              <Dropdown.Item text='Sign Out' onClick={() => setShowModal(true)} />
            </Dropdown.Menu>
          </Dropdown>
        </Responsive>
      </Menu>
    </div>
  )
}

export default withRouter(NavMenu)
