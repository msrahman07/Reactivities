import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react'
import { useStore } from '../stores/store';
import { BoxArrowLeft, Person } from 'react-bootstrap-icons';

const NavBarMenu = () => {
  const { userStore: { user, logout }, windowSizeStore:{windowSize} } = useStore();
  const [isExpand, setIsExpand] = useState(false);
  
  return (
    <Navbar className='navBarMenu' expand={windowSize.width >= 877} expanded={isExpand} fixed="top">
      <Container style={{ marginTop: '5px' }}>
        <Navbar.Brand as={NavLink} to='/' >
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px', maxWidth: '40px' }} />
          <span style={{ color: 'white' }}> Reactivities</span>
        </Navbar.Brand>

        <Navbar.Toggle onClick={() => setIsExpand(!isExpand)} aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
            variant="pills"
            
          >
            {/* <div className='nav-items'> */}
            <Nav.Link 
              onClick={() => setIsExpand(false)}
              as={NavLink} to='/activities' style={{ color: 'white' }}>Activities</Nav.Link>
            
          </Nav>
          <Nav 
            onClick={() => {console.log('click')}}
          >
            <NavDropdown title={
              <>
                <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                <span style={{ color: 'white' }}>{user?.displayName}</span>
              </>

            } id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => setIsExpand(false)} as={NavLink} to={`/profiles/${user?.username}`}><Person />{' '} My Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}><BoxArrowLeft />
                {' '} Logout
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => setIsExpand(false)} as={NavLink} to='/createActivity' >
                <Button positive content="Create Activity" />

              </NavDropdown.Item>
            </NavDropdown>
            {/* </div> */}

          </Nav>
        </Navbar.Collapse>



      </Container>
    </Navbar>
  )
}

export default observer(NavBarMenu)