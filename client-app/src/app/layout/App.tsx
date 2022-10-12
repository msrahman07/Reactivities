import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBarMenu from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import RegisterForm from '../../features/users/RegisterForm';
import PrivateRoute from './PrivateRoute';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(() => {commonStore.setAppLoaded()});
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);
  
  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app...'/>

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      {location.pathname === '/' ?
        <Routes>
          <Route path='/' element={<HomePage key={location.key} />} />
        </Routes>
        :
        <>
          <NavBarMenu />
          <Container style={{ marginTop: '7em' }}>
            <Routes>
                <Route path='activities' element={<PrivateRoute><ActivityDashboard /></PrivateRoute>} />
                <Route path='activities/:id' element={<PrivateRoute><ActivityDetails /></PrivateRoute>} />
                <Route path='createActivity' element={<PrivateRoute><ActivityForm key={location.key} /></PrivateRoute>} />
                <Route path='manage/:id' element={<PrivateRoute><ActivityForm key={location.key} /></PrivateRoute>} />
                <Route path='profiles/:username' element={<PrivateRoute><ProfilePage key={location.key} /></PrivateRoute>} />
                <Route path='errors' element={<PrivateRoute><TestErrors /></PrivateRoute>} />
                <Route path='/server-error' element={<PrivateRoute><ServerError /></PrivateRoute>} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            {/* <ScrollRestoration /> */}
          </Container>
        </>
      }
    </>
  );
}

export default observer(App);
