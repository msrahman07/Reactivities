import { observer } from 'mobx-react-lite';
import React from 'react'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Header, Image, Button } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import DemoAppLogin from '../users/DemoAppLogin';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

const HomePage = () => {
  const { userStore, modalStore } = useStore();

  return (
    <div className='masthead'>

    <Container >
      <div className='flex-column justify-content-cente'>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as='h2' inverted content='Welcome to Reactivities' />
            <Button as={Link} to='/activities' size='huge' inverted >
              Go to Activities!
            </Button>
          </>
        ) : (
          <>
            <DemoAppLogin />
            <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted >
              Login!
            </Button>
            <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted >
              Register!
            </Button>
          </>
        )}
      </div>
    </Container>
    </div>
    
  )
}

export default observer(HomePage)