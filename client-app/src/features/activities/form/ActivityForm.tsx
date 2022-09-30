import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CommonTextInput from '../../../app/common/form/CommonTextInput';
import CommonTextArea from '../../../app/common/form/CommonTextArea';
import CommonSelectInput from '../../../app/common/form/CommonSelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import CommonDateInput from '../../../app/common/form/CommonDateInput';
import { ActivityFormValues } from '../../../app/models/activity';

const ActivityForm = () => {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

  const validationSchema = Yup.object ({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required(),
    category: Yup.string().required(),
    date: Yup.string().required('Date is required').nullable(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  })

  useEffect(() => {
    if (id) loadActivity(id).then(activity => {
      setActivity(new ActivityFormValues(activity))
    })
  }, [id, loadActivity])

  const handleFormSubmit = (activity: ActivityFormValues) => {
    if(!activity.id){
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => {
        navigate(`/activities/${newActivity.id}`);
      });
    }else {
      updateActivity(activity).then(() => {
        navigate(`/activities/${activity.id}`);
      });
    }
  }

  const handleCancel = () => {
    console.log(activity.id);
    if(!activity.id){
      navigate(`/activities`);
    }else{
      navigate(`/activities/${activity.id}`);
    }
  };


  if (id && loadingInitial) return <LoadingComponent content='Loading Activity...' />;

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik
        validationSchema={validationSchema} 
        enableReinitialize 
        initialValues={activity} 
        onSubmit={(values) => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
            
            <CommonTextInput placeholder="Title" name='title'/>
            <CommonTextArea rows={3} placeholder="Description" name='description' />
            <CommonSelectInput options={categoryOptions} placeholder="Category" name='category' />
            <CommonDateInput 
              placeholderText="Date" 
              name='date' 
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm aa'
            />
            <Header content='Location Details' sub color='teal' />

            <CommonTextInput placeholder="City" name='city' />
            <CommonTextInput placeholder="Venue" name='venue' />
            <Button 
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting} 
              floated='right' 
              positive type='submit' 
              content='Submit' 
            />
            <Button floated='right' type='button' content='Cancel' onClick={handleCancel} />
          </Form>
        )}
      </Formik>

    </Segment>

  )
}

export default observer(ActivityForm)