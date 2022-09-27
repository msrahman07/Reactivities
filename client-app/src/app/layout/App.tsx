import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
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
      {location.pathname === '/' ?
        <Routes>
          <Route path='/' element={<HomePage key={location.key} />} />
        </Routes>
        :
        <>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Routes>
                <Route path='activities' element={<ActivityDashboard />} />
                <Route path='activities/:id' element={<ActivityDetails />} />
                <Route path='createActivity' element={<ActivityForm key={location.key} />} />
                <Route path='manage/:id' element={<ActivityForm key={location.key} />} />
                <Route path='errors' element={<TestErrors />} />
                <Route path='/server-error' element={<ServerError />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
          </Container>
        </>
      }
    </>
  );
}

export default observer(App);
