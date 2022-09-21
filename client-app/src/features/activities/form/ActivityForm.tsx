import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Label, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import CommonTextInput from '../../../app/common/form/CommonTextInput';

const ActivityForm = () => {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activity, setActivity] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  })

  const validationSchema = Yup.object ({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required(),
    category: Yup.string().required(),
    date: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  })

  useEffect(() => {
    if (id) loadActivity(id).then(activity => {
      setActivity(activity!)
    })
  }, [id, loadActivity])

  // const handleSubmit = () => {
  //   if(activity.id.length === 0){
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     createActivity(newActivity).then(() => {
  //       navigate(`/activities/${newActivity.id}`);
  //     });
  //   }else {
  //     updateActivity(activity).then(() => {
  //       navigate(`/activities/${activity.id}`);
  //     });
  //   }
  // }

  // const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const {name, value} = event.target;
  //   setActivity({...activity, [name]:value});
  // };

  // const handleCancel = () => {
  //   console.log(activity.id);
  //   if(activity.id.length === 0){
  //     navigate(`/activities`);
  //   }else{
  //     navigate(`/activities/${activity.id}`);
  //   }
  // };

  if (id && loadingInitial) return <LoadingComponent content='Loading Activity...' />;

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema} 
        enableReinitialize 
        initialValues={activity} 
        onSubmit={values => console.log(values)}>
        {({ handleSubmit }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
            
            <CommonTextInput placeholder="Title" name='title'/>
            <CommonTextInput placeholder="Description" name='description' />
            <CommonTextInput placeholder="Category" name='category' />
            <CommonTextInput placeholder="Date" name='date' />
            <CommonTextInput placeholder="City" name='city' />
            <CommonTextInput placeholder="Venue" name='venue' />
            <Button loading={loading} floated='right' positive type='submit' content='Submit' />
            <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
          </Form>
        )}
      </Formik>

    </Segment>

  )
}

export default observer(ActivityForm)