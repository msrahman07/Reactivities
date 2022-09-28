import { error } from 'console'
import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Header, Label } from 'semantic-ui-react'
import CommonTextInput from '../../app/common/form/CommonTextInput'
import { useStore } from '../../app/stores/store'

const LoginForm = () => {
  const { userStore } = useStore();
  return (
    <Formik
        initialValues={{email: '', password: '', error: null}}
        onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => setErrors({error: 'Invalid email or password'}))}
    >
        {({handleSubmit, isSubmitting, errors}) => (
            <Form className='ui form' onSubmit={handleSubmit}>
                <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center' />
                <CommonTextInput name='email' placeholder='email'/>
                <CommonTextInput name='password' placeholder='password' type='password'/>
                <ErrorMessage 
                  name='error'
                  render= {() => 
                    <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>
                  }
                />
                <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
            </Form>
        )}
    </Formik>
  )
}

export default observer(LoginForm)