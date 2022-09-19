import React from 'react';
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

function App() {
  const location = useLocation();
  console.log(location);
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
                <Route path='*' element={<NotFound />} />
            </Routes>
          </Container>
        </>
      }
    </>
  );
}

export default observer(App);
